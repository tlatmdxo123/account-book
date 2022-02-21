import { fireEvent, render, screen } from "@testing-library/react";
import { AddButton } from ".";

describe("AddButton", () => {
  it("renders correctly", () => {
    render(<AddButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  describe("on click", () => {
    it("add query parameter '?open=true'", () => {
      const { history } = renderWithRouter(() => <AddButton />);

      fireEvent.click(screen.getByRole("button"));
      expect(history.location.search).toBe("?open=true");
    });
  });
});
