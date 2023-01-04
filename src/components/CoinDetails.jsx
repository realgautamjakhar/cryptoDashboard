import React from "react";
import { useSelector } from "react-redux";

const CoinDetails = () => {
  const coin = useSelector((state) => state.chart.coin);
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  console.log(coin);
  return (
    <div className="grid h-fit w-full grid-cols-2 gap-2 rounded-xl bg-gradient1 p-4 text-DarkPrimary shadow-exchangeCardShadow xl:max-w-xs xl:grid-cols-1 xl:grid-rows-2">
      <div className=" grid place-content-start gap-2">
        <div className=" flex items-center gap-2">
          <img src={coin.image} className="w-10" alt={coin.name} />

          <span className=" text-base font-semibold">{coin?.name}</span>
        </div>
        <p className=" flex items-center gap-2 text-xs">
          ATH:{" "}
          <span className=" text-base font-semibold ">
            {coin?.ath?.toFixed(2)}
          </span>
          {baseCurr}
        </p>
        <p className=" flex items-center gap-2 text-xs">
          ATL:{" "}
          <span className=" text-base font-semibold ">
            {coin?.atl?.toFixed(2)}
          </span>
          {baseCurr}
        </p>
        <p className=" flex items-center gap-2 text-xs">
          Rank:{" "}
          <span className=" text-base font-semibold ">
            {coin?.market_cap_rank}
          </span>
        </p>
      </div>
      <div className="grid h-full place-content-end justify-end gap-2 md:justify-start">
        <p className=" flex items-center gap-2 text-xs">
          C:{" "}
          <span className=" text-base font-semibold ">
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

        <p className=" flex items-center gap-2  text-xs">
          %:
          <span
            className={`px-2 text-base  font-semibold ${
              coin?.price_change_24h > 0 ? "bg-green" : "bg-red"
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
