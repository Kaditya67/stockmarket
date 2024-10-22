import express from 'express';
import { StockData, EmaData } from '../models/StockData.js';

const router = express.Router();

// Endpoint to fetch chart data based on selected sector and type
router.get('/', async (req, res) => {
    const { symbol, period } = req.query; // Accepting query parameters

    console.log("Request received with query params:", { symbol, period });

    try {
        // Fetching stock data based on symbol
        console.log(`Fetching stock data for symbol: ${symbol}`);
        const stockData = await StockData.find({ symbol }).sort({ date: 1 }).exec();
        console.log("Stock data fetched successfully:", stockData.length);

        // Fetching EMA data based on symbol
        console.log(`Fetching EMA data for symbol: ${symbol}`);
        const emaData = await EmaData.find({ symbol }).sort({ date: 1 }).exec();
        console.log("EMA data fetched successfully:", emaData.length);

        // Format and filter the response based on sector/type if needed
        const filteredStockData = stockData.map(data => ({
            date: data.date,
            open: data.open,
            high: data.high,
            low: data.low,
            close: data.close,
        }));
        console.log("Filtered stock data prepared:", filteredStockData.length);

        // Constructing the response object
        res.status(200).json({
            stockData: filteredStockData,
            emaData,
        });
        console.log("Response sent successfully.");
    } catch (error) {
        console.error("Error fetching chart data:", error.message);
        res.status(500).json({ error: 'Error fetching chart data' });
    }
});

export default router;
