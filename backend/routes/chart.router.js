
import express from 'express';
import StockData from '../models/StockData.js'; // Adjust the import as per your structure

const router = express.Router();

// Endpoint to fetch stock data for the chart
router.get('/stock-data', async (req, res) => {
    try {
        const stockData = await StockData.find({}); // Fetch all stock data
        res.json(stockData);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
