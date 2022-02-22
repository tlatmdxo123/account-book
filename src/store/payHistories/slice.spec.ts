import {
  addHistory,
  deleteHistory,
  editHistory,
  payHistories,
  selectPayHistories,
  selectPayHistoriesAmountSum,
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
  it("add list", () => {
    const previousState: PayHistory[] = [];

    expect(payHistories(previousState, addHistory([history]))).toEqual([
      history,
    ]);
  });

  it("delete list", () => {
    const previousState: PayHistory[] = [history];

    expect(payHistories(previousState, deleteHistory(history.id))).toEqual([]);
  });

  it("edit list", () => {
    const previousState: PayHistory[] = [history];
    const editedHistory: PayHistory = {
      id: "a",
      amount: 4000,
      content: "커피",
      date: history.date,
      category: "카페",
    };

    expect(payHistories(previousState, editHistory(editedHistory))).toEqual([
      editedHistory,
    ]);
  });

  describe("selectors", () => {
    const payHistories: PayHistory[] = [
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
    ];
    it("select pay histories amount sum", () => {
      const sum = selectPayHistoriesAmountSum({ payHistories } as RootState);
      expect(sum).toBe(12200);
    });

    it("select pay histories", () => {
      const result = selectPayHistories({ payHistories } as RootState);
      expect(result).toEqual(payHistories);
    });
  });
});
