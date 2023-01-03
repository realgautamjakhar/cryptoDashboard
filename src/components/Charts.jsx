import React from "react";
import { useSelector } from "react-redux";
import BarChart from "../Chart/BarChart";
import ChartFilter from "./ChartFilter";
import CoinDetails from "./CoinDetails";
import Loading from "./Loading";
const Charts = () => {
  const loading = useSelector((state) => state.chart.loading);
  return (
    <div className="relative grid h-full w-full  grid-cols-1 gap-4 rounded-md border-2 border-accent/20  px-4 pt-16 pb-4 md:grid-cols-[auto_1fr]">
      <ChartFilter />
      {loading ? <Loading /> : <CoinDetails />}
      {loading ? <Loading /> : <BarChart />}
    </div>
  );
};

export default Charts;
