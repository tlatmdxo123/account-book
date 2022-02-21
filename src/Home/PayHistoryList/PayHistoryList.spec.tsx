import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { PayHistoryList } from ".";
import { PayHistory } from "../../types/history";
import { PayHistoryItemProps } from "./PayHistoryItem";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("./PayHistoryItem", () => ({
  PayHistoryItem: ({ history }: PayHistoryItemProps) => (
    <div>{`${history.content} ${history.amount}`}</div>
  ),
}));

const useSelectorMock = useSelector as jest.Mock<
  ReturnType<typeof useSelector>
>;

describe("PayHistoryList", () => {
  it("renders pay history list that matche on selected date", () => {
    const selectedDate = new Date(2020, 7).toString();
    const payHistories = [
      {
        id: "a",
        amount: 4000,
        content: "커피",
        date: new Date(2020, 5).toString(),
        categories: ["카페"],
      },
      {
        id: "b",
        amount: 5200,
        content: "커피",
        date: selectedDate,
        categories: ["카페"],
      },
      {
        id: "c",
        amount: 3000,
        content: "커피",
        date: selectedDate,
        categories: ["카페"],
      },
    ];
    useSelectorMock.mockImplementation((selector) =>
      selector({ payHistories, selectedDate })
    );

    const { container } = render(<PayHistoryList />);
    expect(container.innerHTML).toMatch(
      `${payHistories[1].content} ${payHistories[1].amount}`
    );
    expect(container.innerHTML).toMatch(
      `${payHistories[2].content} ${payHistories[2].amount}`
    );
    expect(container.innerHTML).not.toMatch(
      `${payHistories[0].content} ${payHistories[0].amount}`
    );
  });
});
