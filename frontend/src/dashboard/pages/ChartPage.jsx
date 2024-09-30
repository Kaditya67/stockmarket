import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartPage = () => {
    const [stockData, setStockData] = useState([]);
    const [emaData, setEmaData] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
    const [selectedPeriod, setSelectedPeriod] = useState(20);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const url = `${apiUrl}/api/chart?symbol=${selectedSymbol}&period=${selectedPeriod}`;
                console.log('Fetching data from:', url);  // Log the URL
                
                const response = await axios.get(url);
                setStockData(response.data.stockData);
                setEmaData(response.data.emaData);
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setError('Error fetching chart data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedSymbol, selectedPeriod]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const chartData = {
        labels: stockData.map(data => new Date(data.date)),
        datasets: [
            {
                label: 'Open',
                data: stockData.map(data => data.open),
                borderColor: 'blue',
                fill: false,
            },
            {
                label: 'Close',
                data: stockData.map(data => data.close),
                borderColor: 'green',
                fill: false,
            },
            {
                label: 'High',
                data: stockData.map(data => data.high),
                borderColor: 'orange',
                fill: false,
            },
            {
                label: 'Low',
                data: stockData.map(data => data.low),
                borderColor: 'red',
                fill: false,
            },
            {
                label: `EMA ${selectedPeriod}`,
                data: emaData.map(data => data[`ema${selectedPeriod}`]),
                borderColor: 'purple',
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'week',
                },
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price',
                },
            },
        },
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Stock Chart</h1>
            <div className="mb-4">
                <label className="mr-2">Select Symbol:</label>
                <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
                    <option value="AAPL">AAPL</option>
                    <option value="GOOGL">GOOGL</option>
                    <option value="MSFT">MSFT</option>
                </select>

                <label className="mr-2 ml-4">Select EMA Period:</label>
                <input
                    type="number"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(Number(e.target.value))}
                    min="1"
                />
            </div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartPage;
