import { AddExpenseInMonth } from "@/domain/usecases";

export interface AddMonthlyExpensesRepository {
  add: (params: AddMonthlyExpensesRepository.Params) => Promise<void>;
}

export namespace AddMonthlyExpensesRepository {
  export type Params = Pick<AddExpenseInMonth.Params, "account" | "date">;
}
