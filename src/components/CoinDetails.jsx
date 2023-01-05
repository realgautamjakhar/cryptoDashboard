import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { initialLoadAnimation } from "../utils/animation";
const CoinDetails = () => {
  const coin = useSelector((state) => state.chart.coin);
  return (
    <motion.div
      variants={initialLoadAnimation}
      initial="hidden"
      animate="show"
      transition={{ type: "tween" }}
      className="relative grid h-fit w-full grid-cols-2 gap-2 rounded-xl bg-gradient1 p-4 font-medium text-DarkPrimary shadow-exchangeCardShadow dark:shadow-none  xl:h-full xl:max-w-xs xl:grid-cols-1 xl:grid-rows-2 xl:overflow-hidden"
    >
      <img
        src={coin?.image?.large}
        className="absolute top-[-5rem] right-[-5rem] hidden select-none  opacity-50 xl:block"
        alt={coin.name}
      />
      <div className="z-10 grid gap-2">
        <div className=" flex items-center gap-2">
          <img
            src={coin?.image?.small}
            className=" w-10  select-none"
            alt={coin.name}
          />
          <span className="flex items-center gap-2 text-lg font-bold uppercase sm:text-2xl">
            {coin?.name} <span className="text-sm font-bold">(Usd)</span>
          </span>
        </div>
        <div className="text-sm">
          <p className=" flex items-center gap-2 ">
            ATH:{" "}
            <span className=" text-base font-semibold ">
              {coin?.market_data?.ath?.usd?.toFixed(2)}
            </span>
          </p>
          <p className=" flex items-center gap-2 ">
            ATL:{" "}
            <span className=" text-base font-semibold ">
              {coin?.market_data?.atl?.usd?.toFixed(2)}
            </span>
          </p>
          <p className=" flex items-center gap-2">
            Rank:{" "}
            <span className=" text-2xl font-semibold ">
              {coin?.market_cap_rank}
            </span>
          </p>
        </div>
      </div>

      <div className="z-10 flex w-full flex-col items-end justify-end gap-2 text-sm ">
        <p className=" flex items-center gap-2 ">
          C : {coin?.market_data?.current_price?.usd.toFixed(2)}
        </p>
        <p className=" flex items-center gap-2 ">
          24H: {coin?.market_data?.high_24h?.usd?.toFixed(2)}{" "}
        </p>
        <p className=" flex items-center gap-2 ">
          24L : {coin?.market_data?.low_24h?.usd?.toFixed(2)}{" "}
        </p>

        <p className=" flex items-center gap-2 text-base">
          <span
            className={`rounded-full px-4  text-base font-semibold ${
              coin?.market_data?.price_change_percentage_24h_in_currency?.usd >
              0
                ? "bg-green"
                : "bg-red"
            }`}
          >
            {coin?.market_data?.price_change_percentage_24h_in_currency?.usd?.toFixed(
              2
            )}
            %
          </span>
        </p>
        <span className=" absolute bottom-0 left-4">
          {coin?.market_data?.price_change_percentage_24h_in_currency?.usd >
          0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="invisible h-44 w-44 stroke-green opacity-80 xl:visible"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="invisible h-44 w-44 stroke-red opacity-80 xl:visible"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
              />
            </svg>
          )}
        </span>
      </div>
    </motion.div>
  );
};

export default CoinDetails;
