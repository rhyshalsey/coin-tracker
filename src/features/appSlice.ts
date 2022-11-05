import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timeframes } from "src/constants";

export interface AppState {
  windowWidth: number;
  windowHeight: number;
  currentCoinId: string;
  currentCurrency: string;
  chartTimeframe: Timeframes; // In days
}

const initialState: AppState = {
  windowWidth: 0,
  windowHeight: 0,
  currentCoinId: "",
  currentCurrency: "usd",
  chartTimeframe: Timeframes.DAYS_1,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    windowResized: (
      state,
      action: PayloadAction<{ windowWidth: number; windowHeight: number }>
    ) => {
      state.windowWidth = action.payload.windowWidth;
      state.windowHeight = action.payload.windowHeight;
    },
    coinChanged: (state, action: PayloadAction<string>) => {
      state.currentCoinId = action.payload;
    },
    currencyChanged: (state, action: PayloadAction<string>) => {
      state.currentCurrency = action.payload;
    },
    timeframeChanged: (state, action: PayloadAction<Timeframes>) => {
      state.chartTimeframe = action.payload;
    },
  },
});

export const { windowResized, coinChanged, currencyChanged, timeframeChanged } =
  appSlice.actions;

export default appSlice.reducer;
