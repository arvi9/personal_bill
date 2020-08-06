import { Account } from "./account";

export type MonthlyExpense = {
  value: number;
  account: Account;
  month: number;
  year: number;
};
