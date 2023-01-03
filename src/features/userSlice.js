import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    coins: [
      { name: "Bitcoin", value: 300 },
      { name: "Ethereum", value: 300 },
      { name: "Matic", value: 400 },
      { name: "Scame", value: 1000 },
    ],
  },
});

export default userSlice.reducer;
