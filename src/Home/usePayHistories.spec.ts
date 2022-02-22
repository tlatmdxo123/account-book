import { act, renderHook } from "@testing-library/react-hooks";
import { getPayHistories } from "../utils/api";
import { usePayHistories } from "./usePayHistories";

jest.mock("../utils/api", () => ({
  getPayHistories: jest.fn(),
}));

const getPayHistoriesMock = getPayHistories as unknown as jest.Mock<
  ReturnType<typeof getPayHistories>
>;

describe("usePayHistories", () => {
  describe("while waiting API response", () => {
    it("returns loading state", () => {
      getPayHistoriesMock.mockReturnValue(new Promise(() => {}));
      const { result } = renderHook(() => usePayHistories());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.payHistories).toEqual([]);
    });
  });

  describe("with error", () => {
    it("returns error message", async () => {
      getPayHistoriesMock.mockReturnValue(
        new Promise((res, rej) => {
          rej({ message: "Error" });
        })
      );
      const { result, waitForNextUpdate } = renderHook(() => usePayHistories());

      await act(() => waitForNextUpdate());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe("Error");
      expect(result.current.payHistories).toEqual([]);
    });
  });

  describe("with success", () => {
    it("returns data", async () => {
      const histories = [
        {
          id: "a",
          amount: 10000,
          date: new Date().toString(),
          category: "식사",
          content: "김치삼겹살",
        },
      ];
      getPayHistoriesMock.mockReturnValue(
        new Promise((res, rej) => {
          res(histories);
        })
      );
      const { result, waitForNextUpdate } = renderHook(() => usePayHistories());

      await act(() => waitForNextUpdate());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.payHistories).toEqual(histories);
    });
  });
});
