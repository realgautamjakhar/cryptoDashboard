import React from "react";
import BarChart from "../Chart/BarChart";
import ChartFilter from "./ChartFilter";
const Charts = () => {
  return (
    <div className="relative mx-auto h-full flex justify-center pt-16 pb-4 px-4 border-2 border-accent/20 rounded-md">
      <ChartFilter />
      <BarChart />
    </div>
  );
};

export default Charts;
