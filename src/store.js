import { configureStore } from "@reduxjs/toolkit";
import chartFilterSlice from "./features/chartFilterSlice";
import chartSlice from "./features/chartSlice";
import marketSlice from "./features/marketSlice";
import searchSlice from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    market: marketSlice,
    search: searchSlice,
    chart: chartSlice,
    chartFilter: chartFilterSlice,
  },
});
