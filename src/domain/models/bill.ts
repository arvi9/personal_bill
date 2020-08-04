import { Account } from "./account";

export type Bill = {
  account: Account;
  value: string;
  description: string;
  dueDate: number;
  expirationDate: Date;
};
