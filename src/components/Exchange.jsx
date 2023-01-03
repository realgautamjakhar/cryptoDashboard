import React from "react";
import { useEffect } from "react";
import { base } from "../api/api";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateamount,
  updateBuyCoin,
  updateBuyCoinCurrentPrice,
  updateSellCoin,
  updateSellCoinCurrentPrice,
} from "../features/exchangeSlice";
import ComboxBox from "./headlessUI/ComboBox";
import Modal from "./headlessUI/Modal";
import { useState } from "react";
import { withdrew } from "../features/userSlice";
import { motion } from "framer-motion";

const Exchange = () => {
  let [isOpen, setIsOpen] = useState(false);
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const usersCoin = useSelector((state) => state.user.coins);
  const coins = useSelector((state) => state.market.value);
  const buyCoin = useSelector((state) => state.exchange.buyCoin);
  const sellCoin = useSelector((state) => state.exchange.sellCoin);
  const enteredAmount = useSelector((state) => state.exchange.amount);

  const [amountConverted, setconvertedCoin] = useState();

  const buyCoinCurrentPrice = useSelector(
    (state) => state.exchange.buyCoinCurrentPrice
  );
  const sellCoinCurrentPrice = useSelector(
    (state) => state.exchange.sellCoinCurrentPrice
  );

  const dispatch = useDispatch();

  async function fetchCurrentPrice(coin) {
    const response = await fetch(
      `${base}/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }

  async function getCurrentPrice() {
    if (buyCoin.id && sellCoin.id) {
      dispatch(updateBuyCoinCurrentPrice(await fetchCurrentPrice(buyCoin)));
      dispatch(updateSellCoinCurrentPrice(await fetchCurrentPrice(sellCoin)));
    }
  }

  function handleExchange() {
    if (!usersCoin.length) {
      toast("You are Broke");
    }
    const userHaveCoin = usersCoin.find((coin) => coin.id === sellCoin.id);
    if (userHaveCoin.value > Number(enteredAmount)) {
      dispatch(withdrew({ sellCoin, enteredAmount }));
    }
    setIsOpen(true);
  }

  function handleCurrencyConvert() {
    const result =
      (sellCoinCurrentPrice?.market_data?.current_price?.usd * enteredAmount) /
      buyCoinCurrentPrice?.market_data?.current_price?.usd;
    setconvertedCoin(result.toFixed(5));
  }

  useEffect(() => {
    handleCurrencyConvert();
  }, [enteredAmount]);

  useEffect(() => {
    getCurrentPrice();
  }, [buyCoin, sellCoin]);

  return (
    <div className="grid h-full grid-rows-[auto_auto_auto_auto] gap-4 rounded-md border-2 border-accent p-4 ">
      <Toaster />
      <p className="text-3xl font-semibold text-lightPrimary dark:text-DarkPrimary">
        Exchange Coins
      </p>
      <Modal isModalOpen={isOpen} update={setIsOpen} />
      <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:mx-0 md:grid-cols-2">
        <div className="grid grid-rows-2 gap-6">
          <div className="grid grid-cols-[50px_1fr] items-center gap-2">
            <p className="font-medium text-green">Buy</p>
            <ComboxBox data={coins} coin={buyCoin} update={updateBuyCoin} />
          </div>
          <div className=" grid grid-cols-[50px_1fr] items-center gap-2">
            <p className=" font-medium text-red">Sell</p>
            <ComboxBox data={coins} coin={sellCoin} update={updateSellCoin} />
          </div>
        </div>

        <div className="grid grid-rows-2 gap-6 text-center">
          {!amountConverted ? (
            <p className="text-base text-lightSecondary dark:text-DarkSecondary">
              Enter Value
            </p>
          ) : (
            <p className="text-base font-bold text-accent">
              {amountConverted}{" "}
              <span className=" uppercase"> {buyCoin?.symbol}</span>
            </p>
          )}
          <div className="relative">
            <input
              type="number"
              className="h-fit w-full border-none bg-light py-2 px-4 pl-3 pr-10 text-base font-medium leading-5 text-lightPrimary shadow-md placeholder:text-lightSecondary focus:outline-none dark:bg-dark dark:text-DarkPrimary placeholder:dark:text-DarkSecondary"
              placeholder="0.002 Btc"
              onChange={(e) => dispatch(updateamount(e.target.value))}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute top-0 right-3 bottom-0 h-full w-5 stroke-accent/70"
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
      {buyCoinCurrentPrice && sellCoinCurrentPrice ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative flex items-center justify-around"
        >
          <div className=" flex items-center gap-2">
            <img src={sellCoinCurrentPrice?.image?.thumb} alt="" />
            <p className="">
              {sellCoinCurrentPrice?.market_data?.current_price?.usd} Usd
            </p>
          </div>
          <motion.svg
            initial={{ scale: 1 }}
            animate={{ scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 1, repeat: Infinity }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            className="h-6 w-6 stroke-accent"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </motion.svg>

          <div className=" flex items-center gap-2">
            <img src={buyCoinCurrentPrice?.image?.thumb} alt="" />
            <p className="">
              {buyCoinCurrentPrice?.market_data?.current_price?.usd} Usd
            </p>
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
