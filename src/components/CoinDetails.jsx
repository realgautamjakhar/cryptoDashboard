import React from "react";
import { useSelector } from "react-redux";

const CoinDetails = () => {
  const coin = useSelector((state) => state.chart.coin);
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  console.log(coin);
  return (
    <div className=" grid h-full w-full grid-cols-2 grid-rows-1 gap-2 p-4 md:grid-cols-1 md:grid-rows-2">
      <div className=" grid h-full w-full place-content-start gap-2">
        <div className=" flex items-center gap-2">
          <img src={coin.image} className="w-10" alt={coin.name} />

          <span className=" text-base font-semibold text-accent">
            {coin?.name}
          </span>
        </div>
        <p className=" flex items-center gap-2 text-xs">
          ATH:{" "}
          <span className=" text-base font-semibold text-accent">
            {coin?.ath?.toFixed(2)}
          </span>
          {baseCurr}
        </p>
        <p className=" flex items-center gap-2 text-xs">
          ATL:{" "}
          <span className=" text-base font-semibold text-red">
            {coin?.atl?.toFixed(2)}
          </span>
          {baseCurr}
        </p>
        <p className=" flex items-center gap-2 text-xs">
          Rank:{" "}
          <span className=" text-base font-semibold text-accent">
            {coin?.market_cap_rank}
          </span>
        </p>
      </div>
      <div className="grid h-full place-content-end justify-end gap-2 md:justify-start">
        <p className=" flex items-center gap-2 text-xs">
          C:{" "}
          <span className=" text-base font-semibold text-accent">
            {coin?.current_price?.toFixed(2)}
          </span>
          {baseCurr}
        </p>
        <p className=" flex items-center gap-2 text-sm">
          24H: {coin?.high_24h?.toFixed(2)} {baseCurr}
        </p>
        <p className=" flex items-center gap-2 text-sm">
          24L: {coin?.low_24h?.toFixed(2)} {baseCurr}
        </p>

        <p className=" flex items-center gap-2 text-xs">
          %:{" "}
          <span
            className={`text-base font-semibold  ${
              coin?.price_change_24h > 0 ? "text-green" : "text-red"
            }`}
          >
            {coin?.price_change_percentage_24h?.toFixed(2)}
          </span>
          %
        </p>
      </div>
    </div>
  );
};

export default CoinDetails;
