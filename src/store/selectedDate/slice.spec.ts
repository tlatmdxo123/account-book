import { RootState } from "..";
import { selectedDate, DateString, selectSelectedDate, setDate } from "./slice";

describe("selectedDate slice", () => {
  describe("setDate", () => {
    it("returns set date", () => {
      const before = new Date(2020, 3).toString();
      const toSetDate = new Date(2020, 4).toString();
      const date = selectedDate(before, setDate(toSetDate));
      expect(date).toEqual(toSetDate);
    });
  });

  describe("selectors", () => {
    describe("selectSelectedDate", () => {
      it("returns current date string", () => {
        const selectedDate: DateString = new Date(2020, 4).toString();
        const result = selectSelectedDate({ selectedDate } as RootState);
        expect(result).toBe(selectedDate);
      });
    });
  });
});
