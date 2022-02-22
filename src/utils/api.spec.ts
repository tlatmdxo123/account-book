import { PayHistory } from "../types/history";
import { getPayHistories } from "./api";
import fetchMock from "fetch-mock-jest";

describe("getPayHistories", () => {
  it("fetch pay histories", async () => {
    const histories: PayHistory[] = [
      {
        id: "a",
        amount: 10000,
        date: new Date().toString(),
        category: "식사",
        content: "김치삼겹살",
      },
      {
        id: "b",
        amount: 5000,
        date: new Date().toString(),
        category: "커피",
        content: "이디야",
      },
    ];

    fetchMock.get("http://localhost:4321/histories", JSON.stringify(histories));

    await getPayHistories().then((res) => {
      expect(res).toEqual(histories);
    });
  });
});
