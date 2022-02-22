import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { Home } from ".";
import { addHistory } from "../store/payHistories";
import { usePayHistories } from "./usePayHistories";

jest.mock("./usePayHistories", () => ({ usePayHistories: jest.fn() }));
jest.mock("./Header", () => ({ Header: () => <div>Header</div> }));
jest.mock("./PayHistoryList", () => ({
  PayHistoryList: () => <div>PayHistoryList</div>,
}));
jest.mock("./AddButton", () => ({ AddButton: () => <div>AddButton</div> }));
jest.mock("react-redux", () => ({ useDispatch: jest.fn() }));
jest.mock("../store/payHistories", () => ({ addHistory: jest.fn() }));

const usePayHistoriesMock = usePayHistories as jest.Mock<
  Partial<ReturnType<typeof usePayHistories>>
>;

const useDispatchMock = useDispatch as unknown as jest.Mock<
  Partial<ReturnType<typeof useDispatch>>
>;
const addHistoryMock = addHistory as unknown as jest.Mock<
  Partial<ReturnType<typeof addHistory>>
>;

const dispatch = jest.fn();
const histories = [
  {
    id: "a",
    amount: 10000,
    date: new Date().toString(),
    category: "식사",
    content: "김치삼겹살",
  },
];

const addHistoryAction = {
  type: "addHistory",
  payload: histories,
};

describe("Home", () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
    addHistoryMock.mockReturnValue(addHistoryAction);
  });

  describe("with error", () => {
    it("show error message", () => {
      usePayHistoriesMock.mockReturnValue({
        payHistories: [],
        isLoading: false,
        error: "Error",
      });

      const { container } = render(<Home />);
      expect(container.innerHTML).toMatch("Error");
    });
  });

  describe("with loading", () => {
    it("show loading message", () => {
      usePayHistoriesMock.mockReturnValue({
        payHistories: [],
        isLoading: true,
        error: null,
      });

      const { container } = render(<Home />);
      expect(container.innerHTML).toMatch("Loading");
    });
  });

  describe("with data", () => {
    beforeEach(() => {
      usePayHistoriesMock.mockReturnValue({
        payHistories: histories,
        isLoading: false,
        error: null,
      });
    });

    it("dispatch addHistory", () => {
      render(<Home />);
      expect(dispatch).toHaveBeenCalledWith(addHistoryAction);
    });

    it("renders correctly", () => {
      const { container } = render(<Home />);

      expect(container.innerHTML).toMatch("Header");
      expect(container.innerHTML).toMatch("PayHistory");
      expect(container.innerHTML).toMatch("AddButton");
    });
  });

  describe("with url query 'open=true'", () => {
    it.todo("show payHistory add Modal");
  });

  describe("with url query 'edit=true&id=payHistoryId'", () => {
    it.todo("show payHistory add Modal with input complete");
  });
});
