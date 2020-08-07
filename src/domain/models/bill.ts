import { Account } from "./account";

export type Bill = {
  id: string;
  account: Account;
  value: number;
  description: string;
  dueDate: number;
  firstPaymentDate: Date;
  amount: number;
  active: boolean;
};
