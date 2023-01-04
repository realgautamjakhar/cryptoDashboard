import React from "react";
import { useEffect } from "react";
import { base } from "../api/api";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateamount,
  updateBuy,
  updateBuyPrice,
  updateSell,
  updateSellPrice,
} from "../features/exchangeSlice";
import ComboxBox from "./headlessUI/ComboBox";
import Modal from "./headlessUI/Modal";
import { useState } from "react";
import { deposit, withdrew } from "../features/userSlice";
import { motion } from "framer-motion";
import { error, success } from "../utils/toast";

const Exchange = () => {
  let [isOpen, setIsOpen] = useState(false);
  const portfolio = useSelector((state) => state.user.portfolio);
  const coins = useSelector((state) => state.market.value);
  const buy = useSelector((state) => state.exchange.buy);
  const sell = useSelector((state) => state.exchange.sell);
  const input = useSelector((state) => state.exchange.amount);
  const [exchangedamount, setexchangedamount] = useState(0);
  const buyPrice = useSelector((state) => state.exchange.buyPrice);
  const sellPrice = useSelector((state) => state.exchange.sellPrice);

  const dispatch = useDispatch();

  async function fetchCurrentPrice(coin) {
    const response = await fetch(
      `${base}/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }

  async function getCurrentPrice() {
    if (buy.id && sell.id) {
      dispatch(updateBuyPrice(await fetchCurrentPrice(buy)));
      dispatch(updateSellPrice(await fetchCurrentPrice(sell)));
    }
  }

  function handleExchange() {
    if (!portfolio.length) {
      toast("You are Broke");
    }

    //Check weather user have selling coin and amount above the limit
    const coinExist = portfolio.find((coin) => coin.id === sell.id);

    if (coinExist.amount > Number(input)) {
      dispatch(withdrew({ sell, input }));
      dispatch(deposit({ buy, depositedAmount: exchangedamount }));
      toast(
        `${exchangedamount} ${buy.name} Exchanged for ${input} ${sell.name}`,
        success
      );
    } else if (coinExist.amount < Number(input)) {
      toast("Insufficient balance", error);
    }
  }
  function handleCurrencyConvert() {
    const result =
      (sellPrice?.market_data?.current_price?.usd * input) /
      buyPrice?.market_data?.current_price?.usd;
    setexchangedamount(result.toFixed(5));
  }

  useEffect(() => {
    handleCurrencyConvert();
  }, [input]);

  useEffect(() => {
    dispatch(updateamount(""));
    getCurrentPrice();
  }, [buy, sell]);

  return (
    <div className=" grid h-full gap-4 rounded-md bg-gradient1 px-4 py-4 shadow-exchangeCardShadow dark:shadow-none">
      <Toaster
        containerStyle={{
          top: 20,
          left: 20,
          bottom: 20,
          right: 20,
        }}
      />
      <p className="text-3xl font-semibold text-DarkPrimary">Exchange Coins</p>
      <Modal isModalOpen={isOpen} update={setIsOpen} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="grid grid-cols-1 gap-6">
          <div className=" grid w-full grid-cols-[auto_1fr] items-center gap-4">
            <p className="font-medium text-DarkPrimary">Buy</p>
            <div className=" w-full">
              <ComboxBox data={coins} coin={buy} update={updateBuy} />
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <p className=" font-medium text-DarkPrimary">Sell</p>
            <ComboxBox data={coins} coin={sell} update={updateSell} />
          </div>
        </div>
        <div className="grid grid-cols-1">
          {exchangedamount > 0 ? (
            <div className=" relative flex h-full items-center justify-end gap-2 pt-4 text-DarkPrimary sm:pt-0 ">
              <span className=" absolute top-[-.8rem] left-2 rounded-full bg-gradient2 px-2 py-1 text-[10px] uppercase text-lightPrimary opacity-70 shadow-exchangeCardShadow">
                You will get :
              </span>
              <p className=" text-center text-2xl font-bold">
                {exchangedamount}
              </p>
              <p className="uppercase"> {buy?.symbol}</p>
            </div>
          ) : (
            <p className="m-auto  text-center text-base text-DarkPrimary">
              Enter Value
            </p>
          )}
          <div className=" relative">
            <input
              type="number"
              className="h-fit w-full min-w-[144px] rounded-full border-none bg-light py-3 px-6 pr-10 text-base font-medium leading-5 text-lightPrimary shadow-md placeholder:text-lightSecondary focus:outline-none"
              placeholder="eg. 0.1xx"
              value={input}
              onChange={(e) => dispatch(updateamount(e.target.value))}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute top-3 right-3 w-5 stroke-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      {buyPrice && sellPrice ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-around"
        >
          <div className=" flex items-center gap-2 text-white">
            <img src={sellPrice?.image?.thumb} alt="" />
            <p>{sellPrice?.market_data?.current_price?.usd} Usd</p>
          </div>
          <motion.svg
            initial={{ scale: 1 }}
            animate={{ scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 1, repeat: Infinity }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="h-6 w-6 stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </motion.svg>

          <div className=" flex items-center gap-2 text-white">
            <img src={buyPrice?.image?.thumb} alt="" />
            <p className="">{buyPrice?.market_data?.current_price?.usd} Usd</p>
          </div>
        </motion.div>
      ) : null}

      <button
        className="mx-auto h-fit w-fit rounded-md bg-accent px-4 py-2 font-semibold text-white"
        onClick={handleExchange}
      >
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
