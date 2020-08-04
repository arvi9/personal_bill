import { Account } from "@/domain/models";

export type Expense = {
  id: string;
  value: number;
  date: Date;
  description: string;
  account: Account;
};
