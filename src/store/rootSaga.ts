import { all } from "redux-saga/effects";
import { productHistoriesSaga } from "./payHistories/saga";

export function* rootSaga() {
  yield all([productHistoriesSaga()]);
}
