import React from "react";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const config = {
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 1,
      to: 0,
      loop: true,
    },
  },
};

const BarChart = () => {
  const chartData = useSelector((state) => state.chart.chartData);
  const coin = useSelector((state) => state.chart.coin);

  const [UserData, setUserData] = useState({
    labels: chartData?.prices?.map((d) => new Date().toLocaleDateString(d[0])),
    datasets: [
      {
        label: `${coin.id}`,
        data: chartData?.prices?.map((d) => d[1]),
      },
    ],
  });

  useEffect(() => {
    setUserData({
      labels: chartData?.prices?.map((d) =>
        new Date(d[0]).toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      ),
      datasets: [
        {
          label: `${coin.id}`,
          borderColor: "#736CED",
          backgroundColor: "#736CED",

          data: chartData?.prices?.map((d) => d[1]),
        },
      ],
    });
  }, [chartData]);

  return (
    <div
      className="flex justify-center"
      style={{ position: "relative", height: "40vh", width: "80vw" }}
    >
      <Line data={UserData} options={config} />
    </div>
  );
};

export default BarChart;
