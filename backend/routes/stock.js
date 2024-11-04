import express from 'express';
import { StockData, EmaData } from '../models/StockData.js';
import { RsiData } from '../models/RsiData.js';
import stockServices from '../services/stockServices.js';

const router = express.Router();
const symbols = ['AAPL', 'GOOGL', 'MSFT',];

const isValidStockData = (data) => {
    return data &&
        typeof data['1. open'] === 'string' &&
        typeof data['2. high'] === 'string' &&
        typeof data['3. low'] === 'string' &&
        typeof data['4. close'] === 'string' &&
        typeof data['5. volume'] === 'string';
};

const calculateEMA = (period, prices) => {
    if (prices.length < period) return [];

    const k = 2 / (period + 1);
    let emaArray = [];
    let previousEma = prices[0];

    prices.forEach((price, index) => {
        if (index === 0) {
            emaArray.push(previousEma);
        } else {
            previousEma = price * k + previousEma * (1 - k);
            emaArray.push(previousEma);
        }
    });

    return emaArray;
};

const calculateRSI = (prices, period = 14) => {
    if (prices.length < period) return { rs: null, rsi: null };

    let gains = [];
    let losses = [];

    for (let i = 1; i < period; i++) {
        const difference = prices[i] - prices[i - 1];
        if (difference > 0) gains.push(difference);
        else losses.push(Math.abs(difference));
    }

    let averageGain = gains.reduce((a, b) => a + b, 0) / period;
    let averageLoss = losses.reduce((a, b) => a + b, 0) / period;

    if (averageLoss === 0) return { rs: null, rsi: 100 };

    let rs = averageGain / averageLoss;
    let rsi = 100 - (100 / (1 + rs));

    for (let i = period; i < prices.length; i++) {
        const difference = prices[i] - prices[i - 1];
        const gain = difference > 0 ? difference : 0;
        const loss = difference < 0 ? Math.abs(difference) : 0;

        averageGain = ((averageGain * (period - 1)) + gain) / period;
        averageLoss = ((averageLoss * (period - 1)) + loss) / period;

        rs = averageGain / averageLoss;
        rsi = 100 - (100 / (1 + rs));
    }

    return { rs, rsi };
};

// Fetch and store stock data for the hardcoded symbols from Alpha Vantage
router.get('/multiple', async (req, res) => {
    try {
        console.log("In Multiple")
        const promises = symbols.map(async (symbol) => {
            const timeSeries = await stockServices(symbol);
            if (!timeSeries || Object.keys(timeSeries).length === 0) {
                console.warn(`No time series data available for ${symbol}`);
                return;
            }

            const closePrices = [];
            const dateArray = [];
            const stockDataArray = [];
            const emaDataArray = [];
            const rsiDataArray = [];

            for (const [date, values] of Object.entries(timeSeries)) {
                if (isValidStockData(values)) {
                    closePrices.push(parseFloat(values['4. close']));
                    dateArray.push(date);

                    const stockData = new StockData({
                        symbol,
                        date: new Date(date),
                        open: parseFloat(values['1. open']),
                        high: parseFloat(values['2. high']),
                        low: parseFloat(values['3. low']),
                        close: parseFloat(values['4. close']),
                        volume: parseInt(values['5. volume']),
                    });
                    stockDataArray.push(stockData);
                } else {
                    console.warn(`Invalid data for ${symbol} on ${date}:`, values);
                }
            }

            console.log(`Data length for ${symbol}:`, closePrices.length);

            if (closePrices.length >= 200) {
                emaDataArray.push(
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema7: calculateEMA(7, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema20: calculateEMA(20, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema50: calculateEMA(50, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema100: calculateEMA(100, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema150: calculateEMA(150, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema200: calculateEMA(200, closePrices) }
                );
            } else if (closePrices.length >= 50) {
                emaDataArray.push(
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema7: calculateEMA(7, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema20: calculateEMA(20, closePrices) },
                    { symbol, date: new Date(dateArray[closePrices.length - 1]), ema50: calculateEMA(50, closePrices) }
                );
            }

            for (let i = 0; i <= closePrices.length - 14; i++) {
                const { rs, rsi } = calculateRSI(closePrices.slice(i, i + 14));
                if (rsi !== null) {
                    rsiDataArray.push(new RsiData({
                        symbol,
                        date: new Date(dateArray[i + 13]),
                        rs,
                        rsi,
                    }));
                }
            }

            // Save all stock, EMA, and RSI data in batches
            try {
                await StockData.insertMany(stockDataArray);
            } catch (insertError) {
                console.error(`Error inserting stock data for ${symbol}:`, insertError.message);
            }

            try {
                await EmaData.insertMany(emaDataArray);
            } catch (insertError) {
                console.error(`Error inserting EMA data for ${symbol}:`, insertError.message);
            }

            try {
                await RsiData.insertMany(rsiDataArray);
            } catch (insertError) {
                console.error(`Error inserting RSI data for ${symbol}:`, insertError.message);
            }

            console.log(`Data and EMA/RSI values for ${symbol} have been processed.`);
        });

        await Promise.all(promises);
        res.status(200).json({ message: 'Data, EMA, and RSI values fetched and stored in MongoDB successfully' });
    } catch (error) {
        console.error("Error storing stock data and EMAs/RSIs:", error.message);
        res.status(500).json({ error: 'Error fetching or storing stock data and EMAs/RSIs' });
    }
});

export default router;