import mongoose from 'mongoose';

const stockDataSchema = new mongoose.Schema({
    symbol: { type: String, required: true }, // Stock symbol
    date: { type: Date, required: true },     // Date of the stock data
    open: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    close: { type: Number, required: true },
    volume: { type: Number, required: true },
});

const StockData = mongoose.model('StockData', stockDataSchema);

export default StockData;
