import React, { useState } from "react";
import Chart from "react-apexcharts";

function Charts() {
  const [state, setState] = useState({
    options: {
      colors: ["#6A1B9A", "#AB47BC"], 
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "Trade A",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Trade B",
        data: [3, 60, 35, 80, 49, 70, 20, 81],
      },
    ],
  });

  const chartStyle = {
    display: 'inline-block',
    width: '450px',
    padding: '10px',
    margin: '0 15px', 
  };

  const containerStyle = {
    textAlign: 'center',
    margin: '0 auto',
    paddingTop: '20px', 
  };

  return (
    <div style={containerStyle}>
      <h1>
        <i className="fas fa-user"></i>{" "}
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={chartStyle}>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="450"
          />
        </div>
        <div style={chartStyle}>
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="450"
          />
        </div>
      </div>
    </div>
  );
}

export default Charts;
