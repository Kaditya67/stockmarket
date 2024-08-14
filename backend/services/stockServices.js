import axios from 'axios';

const stockServices = async (symbol, apiKey) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
    return response.data['Time Series (Daily)'];
  } catch (error) {
    throw new Error('Error fetching data from Alpha Vantage');
  }
};

export default stockServices;
