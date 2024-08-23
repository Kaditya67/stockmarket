import express from 'express';
import StockChart from '../models/StockChart.js';
import fetchChartData from '../services/chartServices.js';

const router = express.Router();

// API key from environment variables
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

// List of hardcoded stock symbols
const symbols = ['AAPL', 'GOOGL', 'MSFT'];

// Endpoint to fetch and store stock chart data
router.get('/charts', async (req, res) => {
    try {
        for (const symbol of symbols) {
            const timeSeries = await fetchChartData(symbol, apiKey);

            if (timeSeries) {
                for (const [date, values] of Object.entries(timeSeries)) {
                    // Create a new StockChart document
                    const stockChart = new StockChart({
                        symbol,
                        date: new Date(date),
                        open: parseFloat(values['1. open']),
                        high: parseFloat(values['2. high']),
                        low: parseFloat(values['3. low']),
                        close: parseFloat(values['4. close']),
                        volume: parseInt(values['5. volume']),
                        movingAverage: Math.random() * 100 + 50, // Dummy data
                        rsi: Math.random() * 100, // Dummy data
                        macd: Math.random() * 100 - 50, // Dummy data
                    });

                    // Save the document to MongoDB
                    await stockChart.save();
                }
            } else {
                console.warn(`No chart data available for ${symbol}`);
            }

            console.log(`Chart data for ${symbol} has been processed.`);
        }

        res.status(200).json({ message: 'Chart data fetched and stored in MongoDB successfully' });
    } catch (error) {
        console.error("Error storing chart data:", error.message);
        res.status(500).json({ error: 'Error fetching or storing chart data' });
    }
});

// Endpoint to fetch chart data from the database
router.get('/charts/data', async (req, res) => {
    try {
        const charts = await StockChart.find().sort({ date: -1 }); // Sort by date in descending order
        res.status(200).json(charts);
    } catch (error) {
        console.error("Error fetching chart data from MongoDB:", error.message);
        res.status(500).json({ error: 'Error fetching chart data from MongoDB' });
    }
});

export default router;
