import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const LiveStockGraph = () => {
  const [series, setSeries] = useState([
    {
      name: "Stock Price",
      data: [],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      id: "live-stock-chart",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      range: 60000, // 1 minute
    },
    yaxis: {
      max: 100, // Set the max value according to your data
    },
    colors: ["#6A1B9A"],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.example.com/stock-price" // Replace with your API endpoint
        );
        const newPrice = response.data.price; // Adjust according to your API response
        const newTime = new Date().getTime();

        setSeries((prevSeries) => {
          const updatedData = [...prevSeries[0].data, { x: newTime, y: newPrice }];
          return [{ ...prevSeries[0], data: updatedData }];
        });
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="pt-2 pb-4 px-4 rounded-lg shadow-lg w-full max-w-4xl">
        <Chart options={options} series={series} type="line" height={500} />
      </div>
    </div>
  );
};

export default LiveStockGraph;
