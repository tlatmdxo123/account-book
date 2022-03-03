import { useDispatch, useSelector } from "react-redux";
import {
  addHistory,
  editHistory,
  PayHistoriesState,
} from "../../store/payHistories";
import { renderModal } from "./testUtils";

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
    editHistory: jest.fn(),
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
const editHistoryMock = editHistory as unknown as jest.Mock<
  ReturnType<typeof editHistory>
>;

const dispatch = jest.fn();

describe("Modal", () => {
  const payHistories: PayHistoriesState = {
    error: null,
    data: [
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
    ],
  };

  beforeEach(() => {
    useSelectorMock.mockImplementation((selector) =>
      selector({ payHistories })
    );
    useDispatchMock.mockReturnValue(dispatch);
  });

  describe("with no id", () => {
    it("renders empty inputs", () => {
      const { checkIsAllEmpty, AddButton, CancelButton } = renderModal();
      checkIsAllEmpty();
      expect(AddButton).toBeInTheDocument();
      expect(CancelButton).toBeInTheDocument();
    });

    describe("on click ok button", () => {
      const payload = {
        amount: 20000,
        date: "2021-04-21",
        category: "식사",
        content: "김치삼겹살",
      };
      it("dispatch addHistory with history info", () => {
        const addHistoryAction = {
          type: "addHistory",
          payload,
        };
        addHistoryMock.mockReturnValue(addHistoryAction);
        const { fillAllInput, clickAddButton } = renderModal();
        fillAllInput(payload);
        clickAddButton();
        expect(addHistory).toHaveBeenCalledWith(payload);
        expect(dispatch).toHaveBeenCalledWith(addHistoryAction);
      });

      it("reset form", () => {
        const { fillAllInput, clickAddButton, checkIsAllEmpty } = renderModal();
        fillAllInput(payload);
        clickAddButton();
        checkIsAllEmpty();
      });
    });
  });

  describe("with id", () => {
    it("renders inputs with content", () => {
      const { checkValue, EditButton, CancelButton } = renderModal(
        { id: "a" },
        "?open=true&id=a"
      );
      checkValue({
        amount: 10000,
        date: "2021-05-01",
        category: "식사",
        content: "김치삼겹살",
      });
      expect(EditButton).toBeInTheDocument();
      expect(CancelButton).toBeInTheDocument();
    });

    dispatch("on click ok button", () => {
      it("dispatch edit history with history info", () => {
        const value = {
          amount: 20000,
          date: "2021-04-21",
          category: "식사",
          content: "김치삼겹살",
        };
        const payload = {
          id: "a",
          ...value,
        };

        const editHistoryAction = {
          type: "editHistory",
          payload,
        };

        editHistoryMock.mockReturnValue(editHistoryAction);

        const { fillAllInput, clickAddButton } = renderModal(
          { id: "a" },
          "?open=true&id=a"
        );

        fillAllInput(value);
        clickAddButton();

        expect(editHistory).toBeCalledWith(value);
      });
    });
  });

  describe("when empty input", () => {
    it("disable ok button", () => {
      const { AddButton } = renderModal();
      expect(AddButton).toHaveAttribute("disabled");
    });
  });

  describe("on click cancel button", () => {
    it("route to '/'", () => {
      const { clickCancelButton, getCurrentQueryParams } = renderModal(
        { id: undefined },
        "?open=true"
      );
      clickCancelButton();
      expect(getCurrentQueryParams()).toBe("");
    });
    it("reset input", () => {
      const { clickCancelButton, fillAllInput, checkIsAllEmpty } =
        renderModal();
      fillAllInput({
        content: "김치삼겹살",
        category: "식사",
        date: "2021-04-21",
        amount: 20000,
      });
      clickCancelButton();
      checkIsAllEmpty();
    });
  });
});
