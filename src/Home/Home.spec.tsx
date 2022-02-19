import { render } from "@testing-library/react";
import { Home } from ".";

jest.mock("./Header", () => ({ Header: () => <div>Header</div> }));
jest.mock("./PayHistoryList", () => ({
  PayHistoryList: () => <div>PayHistoryList</div>,
}));
jest.mock("./AddButton", () => ({ AddButton: () => <div>AddButton</div> }));

describe("Home", () => {
  it("renders correctly", () => {
    const { container } = render(<Home />);

    expect(container.innerHTML).toMatch("Header");
    expect(container.innerHTML).toMatch("PayHistory");
    expect(container.innerHTML).toMatch("AddButton");
  });
});
