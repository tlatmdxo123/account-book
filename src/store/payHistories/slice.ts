import { PayHistory } from "../../types/history";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { sum } from "../../utils/helpers";

const initialState: PayHistory[] = [];

const slice = createSlice({
  name: "payHistories",
  initialState,
  reducers: {
    addHistory(
      state: PayHistory[] = initialState,
      action: PayloadAction<PayHistory>
    ) {
      state.push(action.payload);
    },
    editHistory(
      state: PayHistory[] = initialState,
      action: PayloadAction<PayHistory>
    ) {
      return state.map((history) =>
        history.id === action.payload.id ? action.payload : history
      );
    },
    deleteHistory(
      state: PayHistory[] = initialState,
      action: PayloadAction<string>
    ) {
      return state.filter((history) => history.id !== action.payload);
    },
  },
});

export const payHistories = slice.reducer;
export const { addHistory, editHistory, deleteHistory } = slice.actions;
export const selectPayHistoriesAmountSum = (state: RootState) =>
  state.payHistories.map((history) => history.amount).reduce(sum);
