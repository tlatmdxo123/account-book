import {
  addHistories,
  addHistoryError,
  addHistorySuccess,
  deleteHistoryError,
  deleteHistorySuccess,
  editHistoryError,
  editHistorySuccess,
  payHistories,
  PayHistoriesState,
  selectPayHistories,
  selectPayHistoriesAmountSum,
  selectPayHistory,
} from ".";
import { RootState } from "..";
import { PayHistory } from "../../types/history";

describe("PayHistory Reducer", () => {
  const history: PayHistory = {
    id: "a",
    amount: 5100,
    content: "커피",
    date: new Date().toString(),
    category: "카페",
  };
  it("add histories", () => {
    const previousState: PayHistoriesState = {
      error: null,
      data: [],
    };

    expect(payHistories(previousState, addHistories([history]))).toEqual({
      error: null,
      data: [history],
    });
  });

  it("add history success", () => {
    const previousState: PayHistoriesState = {
      error: null,
      data: [],
    };

    expect(payHistories(previousState, addHistorySuccess(history))).toEqual({
      error: null,
      data: [history],
    });
  });

  it("add history error", () => {
    const error = "error";
    const previousState: PayHistoriesState = {
      error: null,
      data: [],
    };

    expect(payHistories(previousState, addHistoryError(error))).toEqual({
      error,
      data: [],
    });
  });

  it("delete history success", () => {
    const previousState: PayHistoriesState = {
      error: null,
      data: [history],
    };

    expect(
      payHistories(previousState, deleteHistorySuccess(history.id!))
    ).toEqual({
      error: null,
      data: [],
    });
  });

  it("delete history error", () => {
    const error = "error";
    const previousState: PayHistoriesState = {
      error: null,
      data: [history],
    };

    expect(payHistories(previousState, deleteHistoryError(error))).toEqual({
      error,
      data: [history],
    });
  });

  it("edit history success", () => {
    const previousState: PayHistoriesState = {
      error: null,
      data: [history],
    };

    const editedHistory: PayHistory = {
      id: "a",
      amount: 4000,
      content: "커피",
      date: history.date,
      category: "카페",
    };

    expect(
      payHistories(previousState, editHistorySuccess(editedHistory))
    ).toEqual({
      error: null,
      data: [editedHistory],
    });
  });

  it("edit history error", () => {
    const previousState: PayHistoriesState = {
      error: null,
      data: [history],
    };

    const error = "error";

    expect(payHistories(previousState, editHistoryError(error))).toEqual({
      error,
      data: [history],
    });
  });

  describe("selectors", () => {
    const payHistories: PayHistoriesState = {
      error: null,
      data: [
        {
          id: "a",
          amount: 4000,
          content: "커피",
          date: history.date,
          category: "카페",
        },
        {
          id: "b",
          amount: 5200,
          content: "커피",
          date: history.date,
          category: "카페",
        },
        {
          id: "c",
          amount: 3000,
          content: "커피",
          date: history.date,
          category: "카페",
        },
      ],
    };
    it("select pay histories amount sum", () => {
      const sum = selectPayHistoriesAmountSum({
        payHistories,
        selectedDate: history.date,
      } as RootState);
      expect(sum).toBe(12200);
    });

    it("select pay histories", () => {
      const result = selectPayHistories({ payHistories } as RootState);
      expect(result).toEqual(payHistories.data);
    });

    it("select pay history", () => {
      const result = selectPayHistory("a")({ payHistories } as RootState);
      expect(result).toEqual({
        id: "a",
        amount: 4000,
        content: "커피",
        date: history.date,
        category: "카페",
      });
    });
  });
});
