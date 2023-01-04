import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base } from "../api/api";

export const fetchChartData = createAsyncThunk(
  "chart/fetchchartdata",
  //Alway pass a object to the async function in thunk !!!!!
  async ({ coin, baseCurr, filter }) => {
    const response = await fetch(
      `${base}/coins/${coin}/market_chart?vs_currency=${baseCurr}&days=${filter}&interval=daily`
    );
    return await response.json();
  }
);

export const fetchCoinDetails = createAsyncThunk(
  "chart/coindetails",
  async (coin) => {
    const response = await fetch(
      `${base}/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
    loading: false,
    error: "",
    coin: {},
    coinDetails: [],
  },
  reducers: {
    updateCoin(state, action) {
      state.coin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      state.chartData = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchChartData.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
      }),
      builder.addCase(fetchChartData.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
      state.coinDetails = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true;
      });
  },
});
export const { updateCoin } = chartSlice.actions;
export default chartSlice.reducer;
