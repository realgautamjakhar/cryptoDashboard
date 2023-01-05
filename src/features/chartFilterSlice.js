import { createSlice } from "@reduxjs/toolkit";

const chartfilterSlice = createSlice({
  name: "chartfilter",
  initialState: {
    filter: 3, // days
    type: "line",
  },
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },
    updateType(state, action) {
      state.type = action.payload;
    },
  },
});
export const { updateFilter, updateType } = chartfilterSlice.actions;
export default chartfilterSlice.reducer;
