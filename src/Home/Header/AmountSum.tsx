import { useSelector } from "react-redux";
import { selectPayHistoriesAmountSum } from "../../store/payHistories";

export const AmountSum = () => {
  const sum = useSelector(selectPayHistoriesAmountSum);

  return <div>{sum.toLocaleString("ko-KR")}원</div>;
};
