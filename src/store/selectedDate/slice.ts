import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export type DateString = string;
export type selectedDateState = DateString;

const initialState: selectedDateState = new Date().toString();

const slice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setDate: (
      state: selectedDateState = initialState,
      action: PayloadAction<DateString>
    ) => {
      return action.payload;
    },
  },
});

export const selectedDate = slice.reducer;
export const { setDate } = slice.actions;
export const selectSelectedDate = (state: RootState) => state.selectedDate;
