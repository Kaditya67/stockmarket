import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StocksPage = () => {
    const [stocksData, setStocksData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/stocks');
            setStocksData(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Open</TableCell>
                        <TableCell>High</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>Close</TableCell>
                        <TableCell>Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocksData.map((stock, index) => (
                        <TableRow key={index}>
                            <TableCell>{stock.symbol}</TableCell>
                            <TableCell>{stock.stock?.open}</TableCell>
                            <TableCell>{stock.stock?.high}</TableCell>
                            <TableCell>{stock.stock?.low}</TableCell>
                            <TableCell>{stock.stock?.close}</TableCell>
                            <TableCell>{stock.stock?.volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {error && <div>Error fetching stock data: {error}</div>}
        </TableContainer>
    );
};

export default StocksPage;
