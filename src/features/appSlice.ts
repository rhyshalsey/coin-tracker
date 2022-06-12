import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  currentCoinId: string;
  currentCurrency: string;
}

const initialState: AppState = {
  currentCoinId: "",
  currentCurrency: "usd",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    coinChanged: (state, action: PayloadAction<string>) => {
      state.currentCoinId = action.payload;
    },
    currencyChanged: (state, action: PayloadAction<string>) => {
      state.currentCurrency = action.payload;
    },
  },
});

export const { coinChanged } = appSlice.actions;

export default appSlice.reducer;
