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

const Exchange = () => {
  let [isOpen, setIsOpen] = useState(false);
  const usersCoin = useSelector((state) => state.user.coins);
  const coins = useSelector((state) => state.market.value);
  const buyCoin = useSelector((state) => state.exchange.buyCoin);
  const sellCoin = useSelector((state) => state.exchange.sellCoin);
  const enteredAmount = useSelector((state) => state.exchange.amount);
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
    console.log(usersCoin);
    console.log(sellCoin.name);
    if (!usersCoin.length) {
      toast("You are Broke");
    }
    const userHaveCoin = usersCoin.find((coin) => coin.id === sellCoin.id);
    console.log(userHaveCoin, enteredAmount);
    if (userHaveCoin.value > Number(enteredAmount)) {
      dispatch(withdrew({ sellCoin, enteredAmount }));
      console.log("You can Withdrew");
    }
    setIsOpen(true);
  }

  useEffect(() => {
    getCurrentPrice();
  }, [buyCoin, sellCoin]);

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4 rounded-md border-2 border-accent/20 p-4">
      <Toaster />
      <p className="text-3xl font-semibold">Exchange Coins</p>
      <Modal isModalOpen={isOpen} update={setIsOpen} />
      <div className="mx-auto grid grid-cols-1 place-content-center gap-6 md:mx-0 md:grid-cols-2">
        <div className="grid grid-rows-2 gap-6">
          <div className="grid grid-cols-[50px_1fr] items-center gap-2">
            <p className=" text-green">Buy</p>
            <ComboxBox data={coins} coin={buyCoin} update={updateBuyCoin} />
          </div>
          <div className=" grid grid-cols-[50px_1fr] items-center gap-2">
            <p className=" text-red">Sell</p>
            <ComboxBox data={coins} coin={sellCoin} update={updateSellCoin} />
          </div>
        </div>

        <div className="grid grid-rows-2 gap-6 text-center">
          <p className="text-base">Enter Value</p>
          <div className=" relative">
            <input
              type="number"
              className="h-fit w-full border-none py-2 px-4 pl-3 pr-10 text-base leading-5 text-gray-900 shadow-md focus:outline-none"
              placeholder="0.002 Btc"
              onChange={(e) => dispatch(updateamount(e.target.value))}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute top-0 right-3 bottom-0 h-full w-4 stroke-accent/70"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
          </div>
        </div>
      </div>

      <button
        className="mx-auto w-fit rounded-md bg-accent px-4 py-2 font-semibold text-white"
        onClick={handleExchange}
      >
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
