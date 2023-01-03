import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    coins: [
      { id: "bitcoin", name: "Bitcoin", value: 300 },
      { id: "ethereum", name: "Ethereum", value: 300 },
      { id: "tether", name: "Tether", value: 400 },
      { id: "usdc", name: "USD Coin", value: 1000 },
    ],
  },
  reducers: {
    withdrew(state, action) {
      const { sellCoin } = action.payload;
      const withdrewAmount = action.payload.enteredAmount;
      // find coin in coins
      const coinIndex = state.coins.findIndex(
        (item) => item.id === sellCoin.id
      );
      if (coinIndex > -1) {
        const existingCoin = state.coins[coinIndex];
        if (existingCoin.value > Number(withdrewAmount)) {
          existingCoin.value = existingCoin.value - Number(withdrewAmount);
        }
      }
    },
  },
});
export const { withdrew } = userSlice.actions;
export default userSlice.reducer;
