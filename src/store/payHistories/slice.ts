import { PayHistory } from "../../types/history";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { sum } from "../../utils/helpers";

export type PayHistoriesState = {
  error: string | null;
  data: PayHistory[];
};

const initialState: PayHistoriesState = {
  error: null,
  data: [],
};

const slice = createSlice({
  name: "payHistories",
  initialState,
  reducers: {
    addHistories(
      state: PayHistoriesState = initialState,
      action: PayloadAction<PayHistory[]>
    ) {
      state.data.push(...action.payload);
    },
    addHistory(
      state: PayHistoriesState = initialState,
      action: PayloadAction<PayHistory>
    ) {},
    addHistorySuccess(
      state: PayHistoriesState = initialState,
      action: PayloadAction<PayHistory>
    ) {
      state.data.push(action.payload);
    },
    addHistoryError(
      state: PayHistoriesState = initialState,
      action: PayloadAction<string>
    ) {
      state.error = action.payload;
    },
    editHistory(
      state: PayHistoriesState = initialState,
      action: PayloadAction<PayHistory>
    ) {},
    editHistorySuccess(
      state: PayHistoriesState = initialState,
      action: PayloadAction<PayHistory>
    ) {
      state.data = state.data.map((history) =>
        history.id === action.payload.id ? action.payload : history
      );
    },
    editHistoryError(
      state: PayHistoriesState = initialState,
      action: PayloadAction<string>
    ) {
      state.error = action.payload;
    },
    deleteHistory(
      state: PayHistoriesState = initialState,
      action: PayloadAction<string>
    ) {},
    deleteHistorySuccess(
      state: PayHistoriesState = initialState,
      action: PayloadAction<string>
    ) {
      state.data = state.data.filter(
        (history) => history.id !== action.payload
      );
    },
    deleteHistoryError(
      state: PayHistoriesState = initialState,
      action: PayloadAction<string>
    ) {
      state.error = action.payload;
    },
  },
});

export const payHistories = slice.reducer;
export const {
  addHistory,
  addHistorySuccess,
  addHistoryError,
  editHistory,
  editHistorySuccess,
  editHistoryError,
  deleteHistory,
  deleteHistorySuccess,
  deleteHistoryError,
  addHistories,
} = slice.actions;
export const selectPayHistoriesAmountSum = (state: RootState) =>
  state.payHistories.data.map((history) => history.amount).reduce(sum);

export const selectPayHistories = (state: RootState) => state.payHistories;
export const selectPayHistory = (id: string) => (state: RootState) =>
  state.payHistories.data.find((history) => history.id === id);
