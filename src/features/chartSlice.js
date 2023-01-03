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

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
    loading: false,
    error: "",
    coin: {},
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
  },
});
export const { updateCoin } = chartSlice.actions;
export default chartSlice.reducer;
