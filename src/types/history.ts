export type Category = string;

export type PayHistory = {
  id: string;
  amount: number;
  date: Date;
  categories: Category[];
  content: string;
};
