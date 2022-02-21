import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "../../store/selectedDate";
import { DateFilter } from "./DateFilter";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../../store/selectedDate", () => ({
  selectSelectedDate: jest.fn(),
  setDate: jest.fn(),
}));

const useSelectorMock = useSelector as jest.Mock<
  ReturnType<typeof useSelector>
>;
const useDispatchMock = useDispatch as jest.Mock<
  ReturnType<typeof useDispatch>
>;
const setDateMock = setDate as unknown as jest.Mock<ReturnType<typeof setDate>>;

describe("DateFilter", () => {
  it("display selected date", () => {
    const selectedDate = new Date(2021, 5).toString();
    useSelectorMock.mockReturnValue(selectedDate);
    render(<DateFilter />);

    const selectedOption = screen.getByDisplayValue("2021년 06월");

    expect(selectedOption).toBeTruthy();
  });

  describe("on Change", () => {
    it("dispatch setCurrentDate", () => {
      const value = new Date(2021, 3).toString();
      const dispatch = jest.fn();
      useDispatchMock.mockReturnValue(dispatch);

      const action = { type: "setDate", payload: value };
      setDateMock.mockReturnValue(action);

      render(<DateFilter />);
      const selector = screen.getByTestId("select");

      fireEvent.change(selector, { target: { value } });
      expect(dispatch).toHaveBeenCalledWith(action);
    });
  });
});
