import { Expense } from "@/domain/models";

export interface AddExpenseInMonth {
  add: (params: AddExpenseInMonth.Params) => Promise<void>;
}

export namespace AddExpenseInMonth {
  export type Params = {
    expense: Expense;
  };
}
