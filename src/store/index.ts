import { configureStore } from "@reduxjs/toolkit";
import { payHistories } from "./payHistories";
import { selectedDate } from "./selectedDate/slice";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    payHistories,
    selectedDate,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type RootAction = ReturnType<typeof payHistories>;
