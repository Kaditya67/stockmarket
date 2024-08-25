import express from 'express';
import { StockData, EmaData } from '../models/StockData.js';
import { RsiData } from '../models/RsiData.js'; // Import the RSI model
import stockServices from '../services/stockServices.js';

const router = express.Router();

// List of hardcoded stock symbols
const symbols = ['AAPL', 'GOOGL', 'MSFT'];

// Utility function to validate stock data
const isValidStockData = (data) => {
    return data &&
        typeof data['1. open'] === 'string' &&
        typeof data['2. high'] === 'string' &&
        typeof data['3. low'] === 'string' &&
        typeof data['4. close'] === 'string' &&
        typeof data['5. volume'] === 'string';
};

// Function to calculate EMA
const calculateEMA = (period, prices) => {
    const k = 2 / (period + 1);
    let emaArray = [];
    let previousEma;

    prices.forEach((price, index) => {
        if (index === 0) {
            previousEma = price; // First EMA is the first price
        } else {
            previousEma = price * k + previousEma * (1 - k);
        }
        emaArray.push(previousEma);
    });

    return emaArray;
};

// Function to calculate RSI and RS
const calculateRSI = (prices, period = 14) => {
    if (prices.length < period) return { rs: null, rsi: null };

    let gains = [];
    let losses = [];

    for (let i = 1; i < period; i++) {
        const difference = prices[i] - prices[i - 1];
        if (difference > 0) {
            gains.push(difference);
        } else {
            losses.push(Math.abs(difference));
        }
    }

    const averageGain = gains.reduce((a, b) => a + b, 0) / period;
    const averageLoss = losses.reduce((a, b) => a + b, 0) / period;

    if (averageLoss === 0) return { rs: null, rsi: 100 }; // Handle the case where averageLoss is zero

    const rs = averageGain / averageLoss;
    const rsi = 100 - (100 / (1 + rs));

    return { rs, rsi };
};

// Endpoint to fetch and store stock data for the hardcoded symbols from Alpha Vantage
router.get('/multiple', async (req, res) => {
    try {
        for (const symbol of symbols) {
            const timeSeries = await stockServices(symbol);

            if (timeSeries) {
                const closePrices = []; // Store close prices for RSI and EMA calculation
                const dateArray = [];   // Store dates corresponding to the close prices

                for (const [date, values] of Object.entries(timeSeries)) {
                    if (isValidStockData(values)) {
                        // Store close prices and dates
                        closePrices.push(parseFloat(values['4. close']));
                        dateArray.push(date);

                        // Create a new StockData document
                        const stockData = new StockData({
                            symbol,
                            date: new Date(date),
                            open: parseFloat(values['1. open']),
                            high: parseFloat(values['2. high']),
                            low: parseFloat(values['3. low']),
                            close: parseFloat(values['4. close']),
                            volume: parseInt(values['5. volume']),
                        });

                        // Save the document to MongoDB
                        await stockData.save();
                    } else {
                        console.warn(`Invalid data for ${symbol} on ${date}:`, values);
                    }
                }

                console.log(`Data length for ${symbol}:`, closePrices.length);

                // Calculate and store EMAs and RSI if data is sufficient
                const emaData = {};
                if (closePrices.length >= 200) {
                    emaData.ema7 = calculateEMA(7, closePrices);
                    emaData.ema20 = calculateEMA(20, closePrices);
                    emaData.ema50 = calculateEMA(50, closePrices);
                    emaData.ema100 = calculateEMA(100, closePrices);
                    emaData.ema150 = calculateEMA(150, closePrices);
                    emaData.ema200 = calculateEMA(200, closePrices);
                } else if (closePrices.length >= 50) {
                    emaData.ema7 = calculateEMA(7, closePrices);
                    emaData.ema20 = calculateEMA(20, closePrices);
                    emaData.ema50 = calculateEMA(50, closePrices);
                }

                for (let i = 0; i <= closePrices.length - 14; i++) {
                    const { rs, rsi } = calculateRSI(closePrices.slice(i, i + 14));

                    if (rsi !== null) {
                        const emaEntry = {
                            symbol,
                            date: new Date(dateArray[i + 13]),
                            ema7: emaData.ema7 ? emaData.ema7[i + 6] || null : null,
                            ema20: emaData.ema20 ? emaData.ema20[i + 19] || null : null,
                            ema50: emaData.ema50 ? emaData.ema50[i + 49] || null : null,
                            ema100: emaData.ema100 ? emaData.ema100[i + 99] || null : null,
                            ema150: emaData.ema150 ? emaData.ema150[i + 149] || null : null,
                            ema200: emaData.ema200 ? emaData.ema200[i + 199] || null : null,
                        };

                        // Create and save EmaData document if at least one EMA field is available
                        if (Object.values(emaEntry).some(value => value !== null)) {
                            const emaDataDoc = new EmaData(emaEntry);
                            await emaDataDoc.save();
                        }

                        const rsiDataDoc = new RsiData({
                            symbol,
                            date: new Date(dateArray[i + 13]),
                            rs: rs,
                            rsi: rsi,
                        });

                        await rsiDataDoc.save();
                    }
                }

                console.log(`Data and EMA/RSI values for ${symbol} have been processed.`);
            } else {
                console.warn(`No time series data available for ${symbol}`);
            }
        }

        res.status(200).json({ message: 'Data, EMA, and RSI values fetched and stored in MongoDB successfully' });
    } catch (error) {
        console.error("Error storing stock data and EMAs/RSIs:", error.message);
        res.status(500).json({ error: 'Error fetching or storing stock data and EMAs/RSIs' });
    }
});

// Endpoint to fetch stock data from the database
router.get('/data', async (req, res) => {
    try {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 1);

        const previousDay = new Date(currentDate.setHours(0, 0, 0, 0));
        const nextDay = new Date(previousDay);
        nextDay.setDate(previousDay.getDate() + 1);

        const stocks = await StockData.aggregate([
            {
                $match: {
                    date: {
                        $gte: previousDay,
                        $lt: nextDay
                    }
                }
            },
            {
                $sort: { date: -1 }
            },
            {
                $group: {
                    _id: "$symbol",
                    latestData: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$latestData" }
            }
        ]);

        res.status(200).json(stocks);
    } catch (error) {
        console.error("Error fetching stock data from MongoDB:", error.message);
        res.status(500).json({ error: 'Error fetching stock data from MongoDB' });
    }
});

export default router;
