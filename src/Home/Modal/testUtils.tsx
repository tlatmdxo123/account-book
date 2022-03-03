import { fireEvent, screen } from "@testing-library/react";
import { Modal, Props } from ".";
import { PayHistory } from "../../types/history";
import { FormatDate } from "../../utils/date";

export function renderModal(props?: Partial<Props>, route?: string) {
  const result = renderWithRouter(() => <Modal {...props} />, route);

  const ContentInput = result.getByLabelText("내용");
  const AmountInput = result.getByLabelText("소비금액");
  const CategoryInput = result.getByLabelText("카테고리");
  const DateInput = result.getByLabelText("날짜");
  const AddButton = result.queryByText("추가");
  const EditButton = result.queryByText("수정");
  const CancelButton = result.getByText("취소");

  function fillAllInput(value: PayHistory) {
    fireEvent.change(ContentInput, {
      target: { value: value.content },
    });
    fireEvent.change(CategoryInput, {
      target: { value: value.category },
    });
    fireEvent.change(DateInput, {
      target: { value: value.date },
    });
    fireEvent.change(AmountInput, {
      target: { value: value.amount.toString() },
    });
  }

  function checkIsAllEmpty() {
    const currentDate = new FormatDate(new Date().toString());
    expect(ContentInput).not.toHaveValue();
    expect(CategoryInput).not.toHaveValue();
    expect(DateInput).toHaveValue(currentDate.getFullFormatedDate("-"));
    expect(AmountInput).not.toHaveValue();
  }

  function checkValue(value: PayHistory) {
    expect(ContentInput).toHaveValue(value.content);
    expect(CategoryInput).toHaveValue(value.category);
    expect(DateInput).toHaveValue(value.date);
    expect(AmountInput).toHaveValue(value.amount.toString());
  }

  function clickAddButton() {
    AddButton && fireEvent.click(AddButton);
  }

  function clickEditButton() {
    EditButton && fireEvent.click(EditButton);
  }

  function clickCancelButton() {
    fireEvent.click(CancelButton);
  }

  function getCurrentQueryParams() {
    return result.history.location.search;
  }

  return {
    ContentInput,
    AmountInput,
    CategoryInput,
    DateInput,
    AddButton,
    EditButton,
    CancelButton,
    fillAllInput,
    checkIsAllEmpty,
    checkValue,
    clickAddButton,
    clickEditButton,
    clickCancelButton,
    getCurrentQueryParams,
  };
}
