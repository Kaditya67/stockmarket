import React from 'react';

function StockList({ stocks }) {
  return (
    <div>
      {stocks.map((stock) => (
        <div key={stock._id} className="p-4 mb-2 border rounded">
          <p><strong>Symbol:</strong> {stock.symbol}</p>
          <p><strong>Date:</strong> {new Date(stock.date).toLocaleDateString()}</p>
          <p><strong>Open:</strong> {stock.open}</p>
          <p><strong>High:</strong> {stock.high}</p>
          <p><strong>Low:</strong> {stock.low}</p>
          <p><strong>Close:</strong> {stock.close}</p>
          <p><strong>Volume:</strong> {stock.volume}</p>
        </div>
      ))}
    </div>
  );
}

export default StockList;
