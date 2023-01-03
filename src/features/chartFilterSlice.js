import { createSlice } from "@reduxjs/toolkit";

const chartfilterSlice = createSlice({
  name: "chartfilter",
  initialState: {
    filter: 30,
  },
  reducers: {
    updateFilter(state, action) {
      state.filter = action.payload;
    },
  },
});
export const { updateFilter } = chartfilterSlice.actions;
export default chartfilterSlice.reducer;
