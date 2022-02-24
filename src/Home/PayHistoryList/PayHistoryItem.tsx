import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteHistory } from "../../store/payHistories";
import { PayHistory } from "../../types/history";

export type PayHistoryItemProps = {
  payHistory: PayHistory;
};

export const PayHistoryItem = ({ payHistory }: PayHistoryItemProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  function onClickDelete(id: string) {
    dispatch(deleteHistory(id));
  }

  function onClickEdit(id: string) {
    history.push(`?open=true&id=${id}`);
  }

  const { id, content, amount, category } = payHistory;
  return (
    <li>
      <div>
        <p>{content}</p>
        <div>#{category}</div>
      </div>
      <div>
        <button onClick={() => onClickEdit(id)}>수정</button>
        <button onClick={() => onClickDelete(id)}>삭제</button>
      </div>
      <span>-{amount.toLocaleString("ko-KR")}원</span>
    </li>
  );
};
