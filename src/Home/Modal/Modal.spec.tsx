import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from ".";
import { addHistory } from "../../store/payHistories";
import { FormatDate } from "../../utils/date";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../../store/payHistories", () => {
  const originalModule = jest.requireActual("../../store/payHistories");

  return {
    __esModule: true,
    ...originalModule,
    addHistory: jest.fn(),
  };
});

const useSelectorMock = useSelector as unknown as jest.Mock<
  ReturnType<typeof useSelector>
>;
const useDispatchMock = useDispatch as unknown as jest.Mock<
  ReturnType<typeof useDispatch>
>;
const addHistoryMock = addHistory as unknown as jest.Mock<
  ReturnType<typeof addHistory>
>;

const dispatch = jest.fn();

describe("Modal", () => {
  beforeEach(() => {
    const payHistories = [
      {
        id: "a",
        amount: 10000,
        date: new Date(2021, 4).toString(),
        category: "식사",
        content: "김치삼겹살",
      },
      {
        id: "b",
        amount: 5100,
        date: new Date().toString(),
        category: "카페",
        content: "이디야",
      },
    ];
    useSelectorMock.mockImplementation((selector) =>
      selector({ payHistories })
    );
    useDispatchMock.mockReturnValue(dispatch);
  });

  describe("with no id", () => {
    it("renders empty inputs", async () => {
      const currentDate = new FormatDate(new Date().toString());
      render(<Modal />);
      expect(screen.getByLabelText("내용")).not.toHaveValue();
      expect(screen.getByLabelText("카테고리")).not.toHaveValue();
      expect(screen.getByLabelText("날짜")).toHaveValue(
        currentDate.getFullFormatedDate("-")
      );
      expect(screen.getByLabelText("소비금액")).not.toHaveValue();
      expect(screen.getByText("추가")).toBeInTheDocument();
      expect(screen.getByText("취소")).toBeInTheDocument();
    });
  });
  describe("with id", () => {
    it("renders inputs with content", () => {
      const currentDate = new FormatDate(new Date(2021, 4).toString());
      render(<Modal id="a" />);
      expect(screen.getByLabelText("내용")).toHaveValue("김치삼겹살");
      expect(screen.getByLabelText("카테고리")).toHaveValue("식사");
      expect(screen.getByLabelText("날짜")).toHaveValue(
        currentDate.getFullFormatedDate("-")
      );
      expect(screen.getByLabelText("소비금액")).toHaveValue("10000");
      expect(screen.getByText("추가")).toBeInTheDocument();
      expect(screen.getByText("취소")).toBeInTheDocument();
    });
  });
  describe("when empty input", () => {
    it("disable ok button", () => {
      render(<Modal />);
      expect(screen.getByText("추가")).toHaveAttribute("disabled");
    });
  });
  describe("on click ok button", () => {
    it("dispatch addHistory with history info", () => {
      const payload = [
        {
          amount: 20000,
          date: "2021-04-21",
          category: "식사",
          content: "김치삼겹살",
        },
      ];
      const addHistoryAction = {
        type: "addHistory",
        payload,
      };
      addHistoryMock.mockReturnValue(addHistoryAction);

      render(<Modal />);
      fireEvent.change(screen.getByLabelText("내용"), {
        target: { value: "김치삼겹살" },
      });
      fireEvent.change(screen.getByLabelText("카테고리"), {
        target: { value: "식사" },
      });
      fireEvent.change(screen.getByLabelText("날짜"), {
        target: { value: "2021-04-21" },
      });
      fireEvent.change(screen.getByLabelText("소비금액"), {
        target: { value: "20000" },
      });

      fireEvent.click(screen.getByText("추가"));
      expect(addHistory).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(addHistoryAction);
    });
  });

  describe("on click cancel button", () => {
    it("route to '/'", () => {
      const { history } = renderWithRouter(() => <Modal />, "?open=true");
      fireEvent.click(screen.getByText("취소"));
      expect(history.location.search).toBe("");
    });
    it("reset input", () => {
      const currentDate = new FormatDate(new Date().toString());
      renderWithRouter(() => <Modal />, "?open=true");
      fireEvent.change(screen.getByLabelText("내용"), {
        target: { value: "김치삼겹살" },
      });
      fireEvent.change(screen.getByLabelText("카테고리"), {
        target: { value: "식사" },
      });
      fireEvent.change(screen.getByLabelText("날짜"), {
        target: { value: "2021-04-21" },
      });
      fireEvent.change(screen.getByLabelText("소비금액"), {
        target: { value: "20000" },
      });

      fireEvent.click(screen.getByText("취소"));
      expect(screen.getByLabelText("내용")).not.toHaveValue();
      expect(screen.getByLabelText("카테고리")).not.toHaveValue();
      expect(screen.getByLabelText("날짜")).toHaveValue(
        currentDate.getFullFormatedDate("-")
      );
      expect(screen.getByLabelText("소비금액")).not.toHaveValue();
    });
  });
});
