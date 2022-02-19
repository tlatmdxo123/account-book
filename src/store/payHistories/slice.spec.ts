import { PayHistory } from "../../types/history";
import { addHistory, deleteHistory, editHistory, payHistories } from "./slice";

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
});
