import {
  addHistory,
  deleteHistory,
  editHistory,
  payHistories,
  selectPayHistoriesAmountSum,
} from ".";
import { RootState } from "..";
import { PayHistory } from "../../types/history";

describe("PayHistory Reducer", () => {
  const history: PayHistory = {
    id: "a",
    amount: 5100,
    content: "커피",
    date: new Date(),
    categories: ["카페", "외식"],
  };
  it("add list", () => {
    const previousState: PayHistory[] = [];

    expect(payHistories(previousState, addHistory(history))).toEqual([history]);
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
      categories: ["카페"],
    };

    expect(payHistories(previousState, editHistory(editedHistory))).toEqual([
      editedHistory,
    ]);
  });

  describe("selectors", () => {
    it("select pay histories amount sum", () => {
      const payHistories: PayHistory[] = [
        {
          id: "a",
          amount: 4000,
          content: "커피",
          date: history.date,
          categories: ["카페"],
        },
        {
          id: "b",
          amount: 5200,
          content: "커피",
          date: history.date,
          categories: ["카페"],
        },
        {
          id: "c",
          amount: 3000,
          content: "커피",
          date: history.date,
          categories: ["카페"],
        },
      ];
      const sum = selectPayHistoriesAmountSum({ payHistories } as RootState);
      expect(sum).toBe(12200);
    });
  });
});
