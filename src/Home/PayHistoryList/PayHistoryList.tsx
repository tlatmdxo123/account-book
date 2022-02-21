import { useSelector } from "react-redux";
import { selectPayHistories } from "../../store/payHistories";
import { selectSelectedDate } from "../../store/selectedDate";
import { isSameYearAndMonth } from "../../utils/date";
import { PayHistoryItem } from "./PayHistoryItem";

export const PayHistoryList = () => {
  const payHistories = useSelector(selectPayHistories);
  const selectedDate = useSelector(selectSelectedDate);

  const filteredHistories = payHistories.filter((history) =>
    isSameYearAndMonth(history.date, selectedDate)
  );
  return (
    <div>
      {filteredHistories.map((history) => (
        <PayHistoryItem payHistory={history} key={history.id} />
      ))}
    </div>
  );
};
