import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BarChart from "../Chart/BarChart";
import LineChart from "../Chart/LineChart";
import ChartFilter from "./ChartFilter";

import CoinDetails from "./CoinDetails";

const Charts = () => {
  const chartData = useSelector((state) => state.chart.chartData); // Chart data from store
  const type = useSelector((state) => state.chartFilter.type); // Type of chart user selected (line is default)
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-10  xl:flex-row">
      {chartData.prices ? (
        <>
          <CoinDetails />
          <div
            style={{
              position: "relative",
              margin: "auto",
              height: "100%",
              width: "90%",
            }}
            className="grid place-content-center overflow-hidden pt-4"
          >
            <ChartFilter />
            {/* Conditional Rendering of bar and line chart componenets  */}
            {type === "line" ? (
              <LineChart chartData={chartData} />
            ) : (
              <BarChart chartData={chartData} />
            )}
          </div>
        </>
      ) : (
        // If no coin select show this div with a message
        <div className="grid w-full place-content-center">
          Please Select Coin To Render Charts
        </div>
      )}
    </div>
  );
};

export default Charts;
