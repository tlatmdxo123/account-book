import { FormatDate, getDateLists, isSameYearAndMonth } from "./date";

describe("date utils", () => {
  describe("FormatDate", () => {
    const date = new FormatDate(new Date(2022, 1, 21).toString());
    describe("getYear", () => {
      it("returns year", () => {
        const year = date.getYear();
        expect(year).toBe("2022");
      });
    });

    describe("getMonth", () => {
      describe("under 10 month", () => {
        it("returns month with zero fill", () => {
          const month = date.getMonth();
          expect(month).toBe("02");
        });
      });

      describe("upper 10 month", () => {
        it("returns month", () => {
          const date = new FormatDate(new Date(2021, 10, 13).toString());
          const month = date.getMonth();
          expect(month).toBe("11");
        });
      });
    });

    describe("getDay", () => {
      it("retruns day", () => {
        const day = date.getDay();
        expect(day).toBe("21");
      });
    });

    describe("getFullFormatedDate", () => {
      it("returns full formated date", () => {
        const formatedDate = date.getFullFormatedDate(".");
        expect(formatedDate).toBe("2022.02.21");
      });
    });
  });

  describe("getDateLists", () => {
    it("returns date lists with get from year,to current", () => {
      const from = new Date(2021, 0);
      const to = new Date(2022, 1);
      const dateLists = [
        new Date(2021, 0).toString(),
        new Date(2021, 1).toString(),
        new Date(2021, 2).toString(),
        new Date(2021, 3).toString(),
        new Date(2021, 4).toString(),
        new Date(2021, 5).toString(),
        new Date(2021, 6).toString(),
        new Date(2021, 7).toString(),
        new Date(2021, 8).toString(),
        new Date(2021, 9).toString(),
        new Date(2021, 10).toString(),
        new Date(2021, 11).toString(),
        new Date(2022, 0).toString(),
        new Date(2022, 1).toString(),
      ];

      const result = getDateLists(from, to);
      expect(result).toEqual(dateLists);
    });
  });

  describe("isSameYearAndMonth", () => {
    const date1 = new Date(2021, 5).toString();
    const date2 = new Date(2021, 5).toString();

    expect(isSameYearAndMonth(date1, date2)).toBeTruthy();
  });
});
