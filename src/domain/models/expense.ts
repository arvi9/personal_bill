import { Account } from "./account";

export type Expense = {
  id: string;
  value: number;
  date: Date;
  description: string;
  account: Account;
};
