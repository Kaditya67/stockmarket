import axios from 'axios';
import Stock from '../models/stockModel.js';

export const fetchAndStoreStockData = async (symbol) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data['Time Series (Daily)'];

    for (const date in data) {
      const stockData = {
        symbol: symbol,
        date: new Date(date),
        open: parseFloat(data[date]['1. open']),
        high: parseFloat(data[date]['2. high']),
        low: parseFloat(data[date]['3. low']),
        close: parseFloat(data[date]['4. close']),
        volume: parseInt(data[date]['5. volume'], 10),
      };

      await Stock.create(stockData);
    }

    console.log(`Stock data for ${symbol} fetched and stored successfully`);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};
