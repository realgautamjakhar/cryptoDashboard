import { configureStore } from "@reduxjs/toolkit";
import chartFilterSlice from "./features/chartFilterSlice";
import chartSlice from "./features/chartSlice";
import exchangeSlice from "./features/exchangeSlice";
import marketSlice from "./features/marketSlice";
import searchSlice from "./features/searchSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    market: marketSlice,
    search: searchSlice,
    chart: chartSlice,
    chartFilter: chartFilterSlice,
    user: userSlice,
    exchange: exchangeSlice,
  },
});
