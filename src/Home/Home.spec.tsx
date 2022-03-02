import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { Home } from ".";
import { addHistories, addHistory } from "../store/payHistories";
import { usePayHistories } from "./usePayHistories";
import { useQuery } from "./useQuery";

jest.mock("./usePayHistories", () => ({ usePayHistories: jest.fn() }));
jest.mock("./Header", () => ({ Header: () => <div>Header</div> }));
jest.mock("./PayHistoryList", () => ({
  PayHistoryList: () => <div>PayHistoryList</div>,
}));
jest.mock("./AddButton", () => ({ AddButton: () => <div>AddButton</div> }));
jest.mock("react-redux", () => ({ useDispatch: jest.fn() }));
jest.mock("../store/payHistories", () => ({ addHistories: jest.fn() }));
jest.mock("./Modal", () => ({
  Modal: ({ id }: { id?: string }) => (id ? <div>{id}</div> : <div>modal</div>),
}));
jest.mock("./useQuery", () => ({ useQuery: jest.fn() }));

const usePayHistoriesMock = usePayHistories as jest.Mock<
  Partial<ReturnType<typeof usePayHistories>>
>;

const useDispatchMock = useDispatch as unknown as jest.Mock<
  Partial<ReturnType<typeof useDispatch>>
>;
const addHistoriesMock = addHistories as unknown as jest.Mock<
  Partial<ReturnType<typeof addHistories>>
>;
const useQueryMock = useQuery as unknown as jest.Mock<
  Partial<ReturnType<typeof useQuery>>
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

type Params = {
  [key: string]: string;
};

describe("Home", () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
    addHistoriesMock.mockReturnValue(addHistoryAction);

    const params: Params = {};
    useQueryMock.mockReturnValue({
      get: (key: string) => params[key],
    });
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

  describe("Modal", () => {
    beforeEach(() => {
      usePayHistoriesMock.mockReturnValue({
        payHistories: histories,
        isLoading: false,
        error: null,
      });
    });
    describe("with no query", () => {
      it("dont renders Modal", () => {
        const { container } = renderWithRouter(() => <Home />, "/");
        expect(container.innerHTML).not.toMatch("modal");
      });
    });

    describe("with url query 'open=true'", () => {
      it("show payHistory Modal with no id", () => {
        const params: Params = {
          open: "true",
        };
        useQueryMock.mockReturnValue({
          get: (key: string) => params[key],
        });
        const { container } = render(<Home />);
        expect(container.innerHTML).toMatch("modal");
      });
    });

    describe("with url query 'open=true&id=payHistoryId'", () => {
      it("show payHistory Modal with id", () => {
        const params: Params = {
          open: "true",
          id: "historyId",
        };
        useQueryMock.mockReturnValue({
          get: (key: string) => params[key],
        });
        const { container } = render(<Home />);
        expect(container.innerHTML).toMatch("historyId");
      });
    });
  });
});
