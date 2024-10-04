import express from 'express';
import { StockData, EmaData } from '../models/StockData.js';

const router = express.Router();

// Endpoint to fetch chart data based on selected sector and type
router.get('/', async (req, res) => {  // Change this line
    const { symbol, period } = req.query; // Accepting query parameters

    try {
        // Fetching stock data and EMA based on symbol
        const stockData = await StockData.find({ symbol }).sort({ date: 1 }).exec();
        const emaData = await EmaData.find({ symbol }).sort({ date: 1 }).exec();

        // Format and filter the response based on sector/type if needed
        const filteredStockData = stockData.map(data => ({
            date: data.date,
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
        }));

        // Constructing the response object
        res.status(200).json({
            stockData: filteredStockData,
            emaData,
        });
    } catch (error) {
        console.error("Error fetching chart data:", error.message);
        res.status(500).json({ error: 'Error fetching chart data' });
    }
});

export default router;
