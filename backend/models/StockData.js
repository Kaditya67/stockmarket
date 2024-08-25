import mongoose from 'mongoose';

// StockData Schema
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

// EmaData Schema
const emaDataSchema = new mongoose.Schema({
    symbol: { type: String, required: true }, // Stock symbol
    date: { type: Date, required: true },     // Date of the EMA calculation
    ema7: { type: Number, required: true },
    ema20: { type: Number, required: true },
    ema50: { type: Number, required: true },
    ema100: { type: Number, required: true },
    ema150: { type: Number, required: true },
    ema200: { type: Number, required: true },
});

const EmaData = mongoose.model('EmaData', emaDataSchema);

// Exporting the models
export { StockData, EmaData };
