import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addHistories } from "../store/payHistories";
import { AddButton } from "./AddButton";
import { Header } from "./Header";
import { Modal } from "./Modal";
import { PayHistoryList } from "./PayHistoryList";
import { usePayHistories } from "./usePayHistories";
import { useQuery } from "./useQuery";

export const Home = () => {
  let query = useQuery();
  let modalOpen = query.get("open");
  const { payHistories, isLoading, error } = usePayHistories();
  const dispatch = useDispatch();

  useEffect(() => {
    if (payHistories.length) {
      dispatch(addHistories(payHistories));
    }
  }, [payHistories]);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <Header />
      <PayHistoryList />
      <AddButton />
      {modalOpen && (
        <Modal id={query.get("id") ? query.get("id")! : undefined} />
      )}
    </div>
  );
};
