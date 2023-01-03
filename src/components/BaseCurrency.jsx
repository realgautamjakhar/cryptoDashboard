import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBaseCurrency } from "../features/searchSlice";
const BaseCurrency = () => {
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const dispatch = useDispatch();
  return (
    <select
      name="baseCurrency"
      id="baseCurrency"
      value={baseCurr}
      onChange={(e) => {
        dispatch(updateBaseCurrency(e.target.value));
      }}
      className=" w-fit bg-transparent  focus:outline-none"
    >
      <option value="usd" className=" px-4 py-2">
        USD
      </option>
      <option value="eur" className=" px-4 py-2">
        EUR
      </option>
      <option value="jpy" className=" px-4 py-2">
        JPY
      </option>
    </select>
  );
};

export default BaseCurrency;
