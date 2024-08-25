// backend/routes/stock.js

import express from 'express';
import {StockData,EmaData} from '../models/StockData.js'
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

// Endpoint to fetch and store stock data for the hardcoded symbols from alpha vantage
router.get('/multiple', async (req, res) => {
  try {
    for (const symbol of symbols) {
      const timeSeries = await stockServices(symbol);

      if (timeSeries) {
        const closePrices = []; // Store close prices for EMA calculation
        const dateArray = []; // Store dates corresponding to the close prices

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

        // Calculate EMAs for the stored close prices
        const ema7 = calculateEMA(7, closePrices);
        const ema20 = calculateEMA(20, closePrices);
        const ema50 = calculateEMA(50, closePrices);
        const ema100 = calculateEMA(100, closePrices);
        const ema150 = calculateEMA(150, closePrices);
        const ema200 = calculateEMA(200, closePrices);

        // Save EMA data to the database
        for (let i = 0; i < closePrices.length; i++) {
          const emaData = new EmaData({
            symbol,
            date: new Date(dateArray[i]),
            ema7: ema7[i],
            ema20: ema20[i],
            ema50: ema50[i],
            ema100: ema100[i],
            ema150: ema150[i],
            ema200: ema200[i],
          });

          await emaData.save();
        }

        console.log(`Data and EMA values for ${symbol} have been processed.`);
      } else {
        console.warn(`No time series data available for ${symbol}`);
      }
    }

    res.status(200).json({ message: 'Data and EMA values fetched and stored in MongoDB successfully' });
  } catch (error) {
    console.error("Error storing stock data and EMAs:", error.message);
    res.status(500).json({ error: 'Error fetching or storing stock data and EMAs' });
  }
});

// Endpoint to fetch stock data from the database
router.get('/data', async (req, res) => {
  try {
    // Get the date for one day before the current date
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);

    // Format the date to remove the time portion
    const previousDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const nextDay = new Date(previousDay);
    nextDay.setDate(previousDay.getDate() + 1); // Get the end of the previous day

    // Aggregate to get the latest stock data for each symbol on the previous day
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
