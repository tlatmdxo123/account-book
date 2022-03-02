import { configureStore } from "@reduxjs/toolkit";
import { payHistories } from "./payHistories";
import { selectedDate } from "./selectedDate/slice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    payHistories,
    selectedDate,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootAction = ReturnType<typeof payHistories>;
