import { sum } from "./helpers";

describe("utils", () => {
  describe("sum", () => {
    it("get two args and return sum", () => {
      const result = sum(5, 2);
      expect(result).toBe(7);
    });
  });
});
