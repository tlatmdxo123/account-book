import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FROM_DATE } from "../../constants";
import { selectSelectedDate, setDate } from "../../store/selectedDate";
import { FormatDate, getDateLists } from "../../utils/date";

export const DateFilter = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const currentDate = new Date();
  const fromDate = new Date(FROM_DATE);
  const dateLists = getDateLists(fromDate, currentDate);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setDate(e.target.value));
  }

  return (
    <select value={selectedDate} onChange={handleChange} data-testid="select">
      {dateLists.map((date) => {
        const formatDate = new FormatDate(date);
        return (
          <option
            key={date}
            value={date}
          >{`${formatDate.getYear()}년 ${formatDate.getMonth()}월`}</option>
        );
      })}
    </select>
  );
};
