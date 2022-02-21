import { configureStore } from "@reduxjs/toolkit";
import { payHistories } from "./payHistories";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    payHistories,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
