import { expectSaga } from "redux-saga-test-plan";
import { PayHistory } from "../../types/history";
import { watchAddHistory, watchDeleteHistory, watchEditHistory } from "./saga";
import * as api from "./api";
import { call } from "redux-saga/effects";
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
import { throwError } from "redux-saga-test-plan/providers";

describe("PayHistories saga", () => {
  const history: PayHistory = {
    id: "a",
    amount: 5100,
    content: "커피",
    date: new Date().toString(),
    category: "카페",
  };

  describe("add history", () => {
    const request: PayHistory = {
      amount: 5100,
      content: "커피",
      date: new Date().toString(),
      category: "카페",
    };
    const response = {
      data: history,
    };
    describe("success", () => {
      it("dispatch addHistorySuccess with history", () => {
        return expectSaga(watchAddHistory)
          .provide([[call(api.fetchAddHistory, request), response]])
          .put(addHistorySuccess(history))
          .dispatch(addHistory(request))
          .silentRun();
      });
    });

    describe("error", () => {
      it("dispatch addHistoryError with error message", () => {
        const error = new Error("error");

        return expectSaga(watchAddHistory)
          .provide([[call(api.fetchAddHistory, request), throwError(error)]])
          .put(addHistoryError("error"))
          .dispatch(addHistory(request))
          .silentRun();
      });
    });
  });

  describe("edit history", () => {
    const editedHistory: PayHistory = {
      id: "a",
      amount: 3000,
      content: "밥",
      date: new Date().toString(),
      category: "식당",
    };
    const response = {
      data: editedHistory,
    };
    describe("success", () => {
      it("dispatch editHistorySuccess with history", () => {
        return expectSaga(watchEditHistory)
          .provide([[call(api.fetchEditHistory, history), response]])
          .put(editHistorySuccess(editedHistory))
          .dispatch(editHistory(history))
          .silentRun();
      });
    });

    describe("error", () => {
      it("dispatch addHistoryError with error message", () => {
        const error = new Error("error");

        return expectSaga(watchEditHistory)
          .provide([[call(api.fetchEditHistory, history), throwError(error)]])
          .put(editHistoryError("error"))
          .dispatch(editHistory(history))
          .silentRun();
      });
    });
  });

  describe("delete history", () => {
    const id = "a";
    describe("success", () => {
      it("dispatch deleteHistorySuccess with id", () => {
        return expectSaga(watchDeleteHistory)
          .provide([[call(api.fetchDeleteHistory, id), { status: 200 }]])
          .put(deleteHistorySuccess(id))
          .dispatch(deleteHistory(id))
          .silentRun();
      });
    });

    describe("error", () => {
      it("dispatch deleteHistoryError with error message", () => {
        const error = new Error("error");

        return expectSaga(watchDeleteHistory)
          .provide([[call(api.fetchDeleteHistory, id), throwError(error)]])
          .put(deleteHistoryError("error"))
          .dispatch(deleteHistory(id))
          .silentRun();
      });
    });
  });
});
