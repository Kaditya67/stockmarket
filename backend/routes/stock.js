import express from 'express';
import axios from 'axios';

const router = express.Router();

// Hardcoded API key
const apiKey = '1K4GU49H6ZW12W5Q';

// List of hardcoded stock symbols
const symbols = ['AAPL', 'GOOGL', 'MSFT'];  // Add any other symbols you'd like

// Endpoint to fetch and print stock data for the hardcoded symbols
router.get('/multiple', async (req, res) => {
    const results = {};

    try {
        for (const symbol of symbols) {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);

            // Print the JSON data for each symbol to the console
            console.log(`Data for ${symbol}:`, JSON.stringify(response.data, null, 2));

            // Store the data in the results object (if needed)
            results[symbol] = response.data;
        }

        // Optionally send a response to confirm completion
        res.status(200).json({ message: 'Data fetched and printed to console' });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching stock data' });
    }
});

export default router;
