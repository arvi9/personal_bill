import { Account } from "./account";

export type MonthlyExpense = {
  id: string;
  value: number;
  account: Account;
  month: number;
  year: number;
};
