import { useHistory } from "react-router-dom";

export const AddButton = () => {
  const history = useHistory();
  function onClickModalOpen() {
    history.push("?open=true");
  }
  return (
    <div>
      <button onClick={onClickModalOpen}></button>
    </div>
  );
};
