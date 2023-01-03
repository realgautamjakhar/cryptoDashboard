import React from "react";
import { Pie, Radar, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from "react-redux";

const options = {
  plugins: {
    legend: {
      display: true,
      position: "right",
    },
  },
};

const Portfolio = () => {
  const userCoin = useSelector((state) => state.user.coins);
  console.log(userCoin);
  const data = {
    labels: userCoin?.map((coin) => coin.name),
    datasets: [
      {
        data: userCoin?.map((coin) => coin.value),
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4 rounded-md border-2 border-accent/20 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold">Portfolio</h2>
        <p className=" text-gray-400">Your Tokens</p>
      </div>
      <div
        style={{
          position: "relative",
          margin: "auto",
          height: "100%",
          width: "90%",
        }}
        className="grid place-content-center overflow-hidden"
      >
        <PolarArea data={data} className="max-h-44" options={options} />
      </div>
    </div>
  );
};

export default Portfolio;
