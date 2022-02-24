import { DateString } from "../store/selectedDate";

export type Category = string;

export type PayHistory = {
  id?: string;
  amount: number;
  date: DateString;
  category: Category;
  content: string;
};
