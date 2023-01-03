import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { fetchCoinList } from "../api/api";
import AppContext from "../Context/AppContext";
import DropDown from "./DropDown";

const Exchange = () => {
  const [FirstCurrency, setFirstCurrency] = useState("");
  const [SecondCurrency, setSecondCurrency] = useState("");
  const { coinList, setcoinList } = useContext(AppContext);
  useEffect(() => {
    const CoinList = async () => {
      setcoinList(await fetchCoinList());
    };
    CoinList();
  }, []);
  return (
    <div className="flex flex-col  justify-center gap-4 px-6 py-6 h-full border-2 border-accent/20 rounded-md">
      <p className="text-2xl font-bold">Exchange Coins</p>
      <div className="flex gap-6 justify-between">
        <div className="flex flex-col gap-4">
          <div className=" flex items-center gap-4">
            <p className=" text-green-700 font-medium">Buy</p>
            <DropDown
              data={coinList}
              input={FirstCurrency}
              setinput={setFirstCurrency}
            />
          </div>
          <div className=" flex items-center gap-4">
            <p className=" text-red-700 font-medium">Sell</p>
            <DropDown
              data={coinList}
              input={SecondCurrency}
              setinput={setSecondCurrency}
            />
          </div>
        </div>
        <div className=" flex flex-col justify-between">
          <p>Enter Value</p>
          <input
            type="number"
            className=" w-[200px] px-4 py-2  rounded-md border-2"
            placeholder="0.002 Btc"
          />
          <p>Calculated Value</p>
        </div>
      </div>
      <button className=" px-4 py-2 rounded-md bg-accent text-white font-semibold w-fit mx-auto">
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
