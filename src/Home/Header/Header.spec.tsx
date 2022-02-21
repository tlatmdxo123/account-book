import { render } from "@testing-library/react";
import { Header } from ".";

jest.mock("./DateFilter", () => ({ DateFilter: () => <div>DateFilter</div> }));
jest.mock("./AmountSum", () => ({ AmountSum: () => <div>AmountSum</div> }));

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = render(<Header />);

    expect(container.innerHTML).toMatch("DateFilter");
    expect(container.innerHTML).toMatch("AmountSum");
  });
});
