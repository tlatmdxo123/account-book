import { act, renderHook } from "@testing-library/react-hooks";
import { AxiosResponse } from "axios";
import { fetchHistories } from "../store/payHistories/api";
import { usePayHistories } from "./usePayHistories";

jest.mock("../store/payHistories/api", () => ({
  fetchHistories: jest.fn(),
}));

const fetchHistoriesMock = fetchHistories as unknown as jest.Mock<
  Partial<ReturnType<typeof fetchHistories>>
>;

describe("usePayHistories", () => {
  describe("while waiting API response", () => {
    it("returns loading state", () => {
      fetchHistoriesMock.mockReturnValue(new Promise(() => {}));
      const { result } = renderHook(() => usePayHistories());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.payHistories).toEqual([]);
    });
  });

  describe("with error", () => {
    it("returns error message", async () => {
      fetchHistoriesMock.mockReturnValue(
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
      fetchHistoriesMock.mockReturnValue(
        new Promise((res, rej) => {
          res({ data: histories } as AxiosResponse);
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
