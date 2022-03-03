import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FROM_DATE } from "../../constants";
import { addHistory, selectPayHistory } from "../../store/payHistories";
import { FormatDate } from "../../utils/date";
import { CATEGORY_LIST } from "./category";

type Props = {
  id?: string;
};

export const Modal = ({ id = "" }: Props) => {
  const dispatch = useDispatch();
  const history = useSelector(selectPayHistory(id));
  const minDate = new FormatDate(FROM_DATE);
  const maxDate = new FormatDate(new Date().toString());

  const historyDate =
    history && new FormatDate(history.date).getFullFormatedDate("-");

  const [content, setContent] = useState(history ? history.content : "");
  const [amount, setAmount] = useState(
    history ? history.amount.toString() : ""
  );
  const [category, setCategory] = useState(history ? history.category : "");
  const [date, setDate] = useState(
    historyDate ? historyDate : maxDate.getFullFormatedDate("-")
  );

  function isNotFormComplete() {
    return content.length === 0 || amount.length === 0 || category.length === 0;
  }

  const urlHistory = useHistory();

  function onClickAddHistory() {
    const newHistory = {
      content,
      amount: +amount,
      category,
      date,
    };
    dispatch(addHistory(newHistory));
    urlHistory.push("/");
  }

  function resetForm() {
    setContent("");
    setCategory("");
    setDate(maxDate.getFullFormatedDate("-"));
    setAmount("");
  }

  function onClickCancelModal() {
    resetForm();
    urlHistory.push("/");
  }

  return (
    <form>
      <label htmlFor="content">내용</label>
      <input
        id="content"
        placeholder="내용을 입력하세요"
        type="text"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <label htmlFor="amount">소비금액</label>
      <input
        id="amount"
        placeholder="금액을 입력하세요"
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <label htmlFor="category">카테고리</label>
      <select
        id="category"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="">카테고리를 선택하세요</option>
        {CATEGORY_LIST.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label htmlFor="date">날짜</label>
      <input
        type="date"
        id="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        min={minDate.getFullFormatedDate("-")}
        max={maxDate.getFullFormatedDate("-")}
      />
      <div>
        <button
          type="button"
          onClick={onClickAddHistory}
          disabled={isNotFormComplete()}
        >
          추가
        </button>
        <button type="button" onClick={onClickCancelModal}>
          취소
        </button>
      </div>
    </form>
  );
};
