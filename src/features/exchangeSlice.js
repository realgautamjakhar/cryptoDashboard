import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base } from "../api/api";

export const fetchCurrentPrice = createAsyncThunk(
  "exchange/fetchcurrentprice",
  async (coin) => {
    const response = await fetch(
      `${base}/${coin.id}/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }
);

const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    buyCoin: {},
    sellCoin: {},
    buyCoinCurrentPrice: 0,
    sellCoinCurrentPrice: 0,
    amount: 0,
  },
  reducers: {
    updateBuyCoin(state, action) {
      state.buyCoin = action.payload;
    },
    updateSellCoin(state, action) {
      state.sellCoin = action.payload;
    },
    updateBuyCoinCurrentPrice(state, action) {
      state.buyCoinCurrentPrice = action.payload;
    },
    updateSellCoinCurrentPrice(state, action) {
      state.sellCoinCurrentPrice = action.payload;
    },
    updateamount(state, action) {
      state.amount = action.payload;
    },
  },
});

export const {
  updateBuyCoin,
  updateSellCoin,
  updateSellCoinCurrentPrice,
  updateBuyCoinCurrentPrice,
  updateamount,
} = exchangeSlice.actions;
export default exchangeSlice.reducer;
