import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { deleteHistory } from "../../store/payHistories";
import { PayHistory } from "../../types/history";
import { PayHistoryItem } from "./PayHistoryItem";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("../../store/payHistories", () => ({
  deleteHistory: jest.fn(),
}));

const useDispatchMock = useDispatch as jest.Mock<
  ReturnType<typeof useDispatch>
>;
const deleteHistoryMock = deleteHistory as unknown as jest.Mock<
  ReturnType<typeof deleteHistory>
>;

describe("PayHistoryItem", () => {
  const payHistory: PayHistory = {
    id: "a",
    content: "밥",
    amount: 12000,
    date: new Date(2021, 3, 21).toString(),
    category: "식사",
  };
  it("renders correctly", () => {
    const { container } = render(<PayHistoryItem payHistory={payHistory} />);

    expect(container.innerHTML).toMatch(payHistory.content);
    expect(container.innerHTML).toMatch("-12,000원");
    expect(container.innerHTML).toMatch("#식사");

    expect(screen.getByText("수정")).toBeInTheDocument();
    expect(screen.getByText("삭제")).toBeInTheDocument();
  });

  describe("on click delete button", () => {
    it("dispatch deleteHistory", () => {
      const dispatch = jest.fn();
      const deleteAction = {
        type: "deleteHistory",
        payload: payHistory.id,
      };

      useDispatchMock.mockReturnValue(dispatch);
      deleteHistoryMock.mockReturnValue(deleteAction);

      render(<PayHistoryItem payHistory={payHistory} />);
      fireEvent.click(screen.getByText("삭제"));

      expect(dispatch).toHaveBeenCalledWith(deleteAction);
    });
  });

  describe("on click edit button", () => {
    it("add query parameter '?edit=true&id'", () => {
      const { history } = renderWithRouter(() => (
        <PayHistoryItem payHistory={payHistory} />
      ));

      fireEvent.click(screen.getByText("수정"));
      expect(history.location.search).toBe(`?edit=true&id=${payHistory.id}`);
    });
  });
});
