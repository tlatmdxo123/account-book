import { AddButton } from "./AddButton";
import { Header } from "./Header";
import { PayHistoryList } from "./PayHistoryList";

export const Home = () => {
  return (
    <div>
      <Header />
      <PayHistoryList />
      <AddButton />
    </div>
  );
};
