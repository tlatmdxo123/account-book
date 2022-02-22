export const getPayHistories = () => {
  return fetch("http://localhost:4321/histories").then((res) => res.json());
};
