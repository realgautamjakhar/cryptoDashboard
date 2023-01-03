import React from "react";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
          // year: "numeric",
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
      style={{
        position: "relative",
        margin: "auto",
        height: "100%",
        width: "90%",
      }}
      className=" grid place-content-center overflow-hidden"
    >
      <Line data={UserData} />
    </div>
  );
};

export default BarChart;
