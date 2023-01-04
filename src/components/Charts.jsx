import React from "react";
import { useSelector } from "react-redux";
import BarChart from "../Chart/BarChart";
import ChartFilter from "./ChartFilter";
import CoinDetails from "./CoinDetails";
import Loading from "./Loading";
const Charts = () => {
  const loading = useSelector((state) => state.chart.loading);
  const data = useSelector((state) => state.chart.chartData);
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-10 pt-20  xl:flex-row">
      <ChartFilter />
      {data.prices ? <CoinDetails /> : <Loading />}
      {loading ? <Loading /> : <BarChart />}
    </div>
  );
};

export default Charts;
