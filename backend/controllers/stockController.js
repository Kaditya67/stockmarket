import stock from '../models/stock.js';
import stockServices from '../services/stockServices.js';

export const saveStockData = async (req, res) => {
  const { symbol } = req.query;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  try {
    const timeSeries = await stockServices(symbol, apiKey);

    if (timeSeries) {
      for (const date in timeSeries) {
        const stockData = new stock({
          symbol,
          date,
          open: parseFloat(timeSeries[date]['1. open']),
          high: parseFloat(timeSeries[date]['2. high']),
          low: parseFloat(timeSeries[date]['3. low']),
          close: parseFloat(timeSeries[date]['4. close']),
          volume: parseInt(timeSeries[date]['5. volume'], 10),
        });

        await stockData.save();
      }
      res.json({ message: 'Stock data saved successfully!' });
    } else {
      res.status(404).json({ message: 'No data found for the given symbol.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error saving stock data', error: error.message });
  }
};
