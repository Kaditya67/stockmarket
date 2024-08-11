import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: String,
  date: Date,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
