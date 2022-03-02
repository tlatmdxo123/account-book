import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  addHistory,
  addHistoryError,
  addHistorySuccess,
  deleteHistory,
  deleteHistoryError,
  deleteHistorySuccess,
  editHistory,
  editHistoryError,
  editHistorySuccess,
} from ".";
import { PayHistory } from "../../types/history";
import * as api from "./api";

function* fetchAddHistorySaga(action: PayloadAction<PayHistory>) {
  try {
    const res: AxiosResponse = yield call(api.fetchAddHistory, action.payload);
    yield put(addHistorySuccess(res.data));
  } catch (error) {
    yield put(addHistoryError((error as Error).message));
  }
}

function* fetchEditHistorySaga(action: PayloadAction<PayHistory>) {
  try {
    const res: AxiosResponse = yield call(api.fetchEditHistory, action.payload);
    yield put(editHistorySuccess(res.data));
  } catch (error) {
    yield put(editHistoryError((error as Error).message));
  }
}

function* fetchDeleteHistorySaga(action: PayloadAction<string>) {
  try {
    yield call(api.fetchDeleteHistory, action.payload);
    yield put(deleteHistorySuccess(action.payload));
  } catch (error) {
    yield put(deleteHistoryError((error as Error).message));
  }
}

export function* watchAddHistory() {
  yield takeEvery(addHistory.type, fetchAddHistorySaga);
}

export function* watchEditHistory() {
  yield takeEvery(editHistory.type, fetchEditHistorySaga);
}

export function* watchDeleteHistory() {
  yield takeEvery(deleteHistory.type, fetchDeleteHistorySaga);
}
