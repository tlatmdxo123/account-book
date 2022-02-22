import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHistory } from "../store/payHistories";
import { AddButton } from "./AddButton";
import { Header } from "./Header";
import { PayHistoryList } from "./PayHistoryList";
import { usePayHistories } from "./usePayHistories";

export const Home = () => {
  const { payHistories, isLoading, error } = usePayHistories();
  const dispatch = useDispatch();

  useEffect(() => {
    if (payHistories.length) {
      dispatch(addHistory(payHistories));
    }
  }, [payHistories]);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <Header />
      <PayHistoryList />
      <AddButton />
    </div>
  );
};
