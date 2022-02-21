import { render } from "@testing-library/react";
import { useSelector } from "react-redux";
import { PayHistory } from "../../types/history";
import { AmountSum } from "./AmountSum";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

const useSelectorMock = useSelector as jest.Mock<
  ReturnType<typeof useSelector>
>;

describe("AmountSum", () => {
  it("renders pay histories amount sum", () => {
    const payHistories: PayHistory[] = [
      {
        id: "a",
        amount: 4000,
        content: "커피",
        date: new Date(),
        categories: ["카페"],
      },
      {
        id: "b",
        amount: 5200,
        content: "커피",
        date: new Date(),
        categories: ["카페"],
      },
      {
        id: "c",
        amount: 3000,
        content: "커피",
        date: new Date(),
        categories: ["카페"],
      },
    ];
    useSelectorMock.mockImplementation((selector) =>
      selector({ payHistories })
    );
    const { container } = render(<AmountSum />);

    expect(container.innerHTML).toMatch("12,200원");
  });
});
