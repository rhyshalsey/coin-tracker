import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  selectedSymbol: string;
}

const initialState: AppState = {
  selectedSymbol: "btc",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    symbolSelected: (state, action: PayloadAction<string>) => {
      state.selectedSymbol = action.payload;
    },
  },
});

export const { symbolSelected } = appSlice.actions;

export default appSlice.reducer;
