import Stock from '../models/stockModel.js';

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stock data' });
  }
};
