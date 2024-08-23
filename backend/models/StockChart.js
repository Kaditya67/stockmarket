import mongoose from 'mongoose';

const stockChartSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    date: { type: Date, required: true },
    open: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    close: { type: Number, required: true },
    volume: { type: Number, required: true },
    movingAverage: { type: Number, required: false },
    rsi: { type: Number, required: false },
    macd: { type: Number, required: false },
});

const StockChart = mongoose.model('StockChart', stockChartSchema);

export default StockChart;
