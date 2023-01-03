import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { base, fetchCoinList } from "../api/api";
import AppContext from "../Context/AppContext";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBuyCoin,
  updateBuyCoinCurrentPrice,
  updateSellCoin,
  updateSellCoinCurrentPrice,
} from "../features/exchangeSlice";

const Exchange = () => {
  const buyCoin = useSelector((state) => state.exchange.buyCoin);
  const sellCoin = useSelector((state) => state.exchange.sellCoin);

  const dispatch = useDispatch();

  const { coinList, setcoinList } = useContext(AppContext);

  async function fetchCurrentPrice(coin) {
    const response = await fetch(
      `${base}/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }

  async function handleExchange() {
    if (buyCoin.id && sellCoin.id) {
      dispatch(updateBuyCoinCurrentPrice(await fetchCurrentPrice(buyCoin)));
      dispatch(updateSellCoinCurrentPrice(await fetchCurrentPrice(sellCoin)));
    }
  }

  useEffect(() => {
    handleExchange();
  }, [buyCoin, sellCoin]);

  useEffect(() => {
    const CoinList = async () => {
      setcoinList(await fetchCoinList());
    };
    CoinList();
  }, []);
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4 rounded-md border-2 border-accent/20 p-4">
      <p className="text-3xl font-semibold">Exchange Coins</p>

      <div className="mx-auto grid grid-cols-1 place-content-center md:mx-0 md:grid-cols-2">
        <div className="grid gap-6">
          <div className="grid grid-cols-[50px_1fr] items-center gap-2">
            <p className=" text-green-700">Buy</p>
            <DropDown data={coinList} coin={buyCoin} update={updateBuyCoin} />
          </div>
          <div className=" grid grid-cols-[50px_1fr] items-center gap-2">
            <p className=" text-red-700">Sell</p>
            <DropDown data={coinList} coin={sellCoin} update={updateSellCoin} />
          </div>
        </div>

        <div className="grid grid-rows-3">
          <p className="mb-[-10px] text-sm">Enter Value</p>
          <input
            type="number"
            className="w-full max-w-[200px] rounded-md border-2 border-accent/20 bg-transparent  px-4 py-2 text-base focus:outline-none"
            placeholder="0.002 Btc"
          />
          <p>Calculated Value</p>
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
