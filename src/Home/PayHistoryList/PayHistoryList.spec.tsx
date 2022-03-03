import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { PayHistoryList } from ".";
import { PayHistoriesState } from "../../store/payHistories";
import { PayHistory } from "../../types/history";
import { PayHistoryItemProps } from "./PayHistoryItem";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("./PayHistoryItem", () => ({
  PayHistoryItem: ({ payHistory }: PayHistoryItemProps) => (
    <div>{`${payHistory.content} ${payHistory.amount}`}</div>
  ),
}));

const useSelectorMock = useSelector as jest.Mock<
  ReturnType<typeof useSelector>
>;

describe("PayHistoryList", () => {
  it("renders pay history list that matche on selected date", () => {
    const selectedDate = new Date(2020, 7).toString();
    const payHistories: PayHistoriesState = {
      error: null,
      data: [
        {
          id: "a",
          amount: 4000,
          content: "커피",
          date: new Date(2020, 5).toString(),
          category: "카페",
        },
        {
          id: "b",
          amount: 5200,
          content: "커피",
          date: selectedDate,
          category: "카페",
        },
        {
          id: "c",
          amount: 3000,
          content: "커피",
          date: selectedDate,
          category: "카페",
        },
      ],
    };
    useSelectorMock.mockImplementation((selector) =>
      selector({ payHistories, selectedDate })
    );

    const { container } = render(<PayHistoryList />);
    expect(container.innerHTML).toMatch(
      `${payHistories.data[1].content} ${payHistories.data[1].amount}`
    );
    expect(container.innerHTML).toMatch(
      `${payHistories.data[2].content} ${payHistories.data[2].amount}`
    );
    expect(container.innerHTML).not.toMatch(
      `${payHistories.data[0].content} ${payHistories.data[0].amount}`
    );
  });

  describe("no payHistories", () => {
    it("show empty message", () => {
      const selectedDate = new Date(2020, 7).toString();
      const payHistories: PayHistoriesState = {
        error: null,
        data: [],
      };

      useSelectorMock.mockImplementation((selector) =>
        selector({ payHistories, selectedDate })
      );
      const { container } = render(<PayHistoryList />);
      expect(container.innerHTML).toMatch("empty");
    });
  });
});
