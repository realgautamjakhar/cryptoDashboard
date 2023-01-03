import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base } from "../api/api";

export const fetchBestMatches = createAsyncThunk(
  "search/bestmatches",
  async (coin) => {
    const response = await fetch(`${base}/search?query=${coin}`);
    return await response.json();
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    //Searching dropdown
    bestMatches: [],
    loading: false,
    error: "",
    //Searched Coin info for chart fetching and base currency
    searchedCoin: [],
    baseCurrency: "usd",
  },
  reducers: {
    updateBaseCurrency(state, action) {
      console.log(action.payload);
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBestMatches.fulfilled, (state, action) => {
      state.bestMatches = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchBestMatches.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(fetchBestMatches.rejected, (state, action) => {
        state.error = action.payload.error.message;
        state.loading = false;
      });
  },
});
export const { updateBaseCurrency } = searchSlice.actions;
export default searchSlice.reducer;
