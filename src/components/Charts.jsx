import React from "react";
import { useSelector } from "react-redux";
import BarChart from "../Chart/BarChart";

import CoinDetails from "./CoinDetails";

const Charts = () => {
  const data = useSelector((state) => state.chart.chartData);
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-10  xl:flex-row">
      {data.prices && <CoinDetails />}
      {data.prices ? (
        <BarChart />
      ) : (
        <div className="flex w-full items-center justify-center">
          Please Select Coin to Render chart
        </div>
      )}
    </div>
  );
};

export default Charts;
