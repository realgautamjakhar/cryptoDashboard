import React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { fetchMarket } from "../features/marketSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchChartData, updateCoin } from "../features/chartSlice";
import { Staggercontainer, Staggeritem } from "../utils/animation";
const Market = () => {
  //Redux
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const data = useSelector((state) => state.market.value);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.market.loading);
  const filter = useSelector((state) => state.chartFilter.filter);

  const coin = useSelector((state) => state.chart.coin);
  //Return marketcap in billions
  const marketCapTobillion = (marketcap) => {
    return (marketcap / 1000000000).toFixed(2);
  };

  //Change data based on the base currency also
  useEffect(() => {
    dispatch(fetchMarket(baseCurr));
  }, [baseCurr]);

  //Chart update on click
  function handleClick(coin) {
    const { id } = coin;
    dispatch(updateCoin(coin));
    dispatch(fetchChartData({ coin: id, baseCurr, filter }));
  }
  return (
    <div className="mx-auto grid h-full w-full grid-rows-[auto_1fr] rounded-md border-2 border-accent">
      <h2 className="border-b-2 border-lightSecondary/20 px-4 py-4 text-end text-3xl font-semibold capitalize text-lightPrimary dark:border-DarkSecondary/20 dark:text-DarkPrimary">
        Cryptocurrency by market cap
      </h2>
      {loading ? (
        <div className=" grid place-content-center">
          <img src="/assets/loading.svg" className=" h-16 w-16 " alt="" />
        </div>
      ) : (
        <motion.ul
          variants={Staggercontainer}
          initial="hidden"
          animate="show"
          className="custom-scroll grid gap-2 overflow-x-hidden overflow-y-scroll px-4 py-4 "
        >
          {data?.slice(0, 20).map((coin) => {
            const {
              name,
              market_cap,
              symbol,
              image,
              id,
              price_change_percentage_24h,
              current_price,
            } = coin;
            return (
              <motion.li
                variants={Staggeritem}
                key={id}
                onClick={() => handleClick(coin)}
                className="flex cursor-pointer justify-between rounded-md px-4 py-4 duration-300 ease-in-out hover:bg-accent/40"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    className="h-10 w-10 object-contain"
                    alt={name}
                  />
                  <div>
                    <div>
                      <span className="text-base font-bold text-lightPrimary dark:text-DarkPrimary">
                        {name}
                      </span>
                      <span className=" pl-1 text-sm font-light uppercase text-lightSecondary dark:text-DarkSecondary">
                        ({symbol})
                      </span>
                    </div>
                    <span
                      className={`text-base text-lightSecondary dark:text-DarkSecondary`}
                    >
                      {current_price}{" "}
                    </span>
                    <span className=" text-sm font-light capitalize text-lightSecondary dark:text-DarkSecondary">
                      {baseCurr}
                    </span>
                  </div>
                </div>
                <div className="hidden  flex-col md:flex">
                  <div>
                    <p className="text-lightPrimary dark:text-DarkPrimary">
                      {marketCapTobillion(market_cap)}billions
                    </p>
                  </div>
                  <div className="flex gap-4 self-end">
                    {price_change_percentage_24h > 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        className="h-6 w-6 stroke-green stroke-2"
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
                        className="h-6 w-6 stroke-red stroke-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
                        />
                      </svg>
                    )}
                    <span className="text-lightSecondary dark:text-DarkSecondary">
                      {price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
};

export default Market;
