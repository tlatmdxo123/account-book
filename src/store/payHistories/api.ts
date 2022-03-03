import { PayHistory } from "../../types/history";
import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "../../constants";

const instance = axios.create({
  baseURL: SERVER_URL,
});

export function fetchHistories() {
  return instance.get(SERVER_URL + "/histories");
}

export function fetchAddHistory(payHistory: PayHistory) {
  console.log(payHistory);
  return instance.post(SERVER_URL + "/histories/new", payHistory);
}

export function fetchEditHistory(payHistory: PayHistory) {
  return instance.post(SERVER_URL + `/histories/${payHistory.id}`, payHistory);
}

export function fetchDeleteHistory(id: string) {
  return instance.delete(SERVER_URL + `/histories/${id}`);
}
