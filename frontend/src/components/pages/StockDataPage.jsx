import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockDataPage = () => {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${apiUrl}/api/stocks/data`);
                
                // Log the received data to the console
                console.log('Received stock data from API:', response.data);
                
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setError('Error fetching stock data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Stock Data</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">Symbol</th>
                            <th className="py-2 px-4 border-b">Date</th>
                            <th className="py-2 px-4 border-b">Open</th>
                            <th className="py-2 px-4 border-b">High</th>
                            <th className="py-2 px-4 border-b">Low</th>
                            <th className="py-2 px-4 border-b">Close</th>
                            <th className="py-2 px-4 border-b">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockData.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-4 text-center">No stock data available</td>
                            </tr>
                        ) : (
                            stockData.map(stock => (
                                <tr key={stock._id}>
                                    <td className="py-2 px-4 border-b">{stock.symbol}</td>
                                    <td className="py-2 px-4 border-b">{new Date(stock.date).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 border-b">{stock.open.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{stock.high.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{stock.low.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{stock.close.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b">{stock.volume.toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockDataPage;
