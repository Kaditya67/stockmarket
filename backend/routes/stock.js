import express from 'express';
import axios from 'axios';
import StockData from '../models/StockData.js';
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

// Endpoint to fetch and store stock data for the hardcoded symbols
router.get('/multiple', async (req, res) => {
    try {
        for (const symbol of symbols) {
            const timeSeries = stockServices();

            // Check if the timeSeries exists before processing
            if (timeSeries) {
                for (const [date, values] of Object.entries(timeSeries)) {
                    if (isValidStockData(values)) {
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
            } else {
                console.warn(`No time series data available for ${symbol}`);
            }

            console.log(`Data for ${symbol} has been processed.`);
        }

        res.status(200).json({ message: 'Data fetched and stored in MongoDB successfully' });
    } catch (error) {
        console.error("Error storing stock data:", error.message);
        res.status(500).json({ error: 'Error fetching or storing stock data' });
    }
});

export default router;


