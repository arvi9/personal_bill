import { AddExpenseInMonth } from "@/domain/usecases";

export interface ExpenseListener {
  update: (params: ExpenseListener.Params) => Promise<void>;
}

export namespace ExpenseListener {
  export type Params = AddExpenseInMonth.Params;
}
