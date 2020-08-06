import { AddExpenseInMonth } from "@/domain/usecases";

export interface AddMonthlyExpensesRepository {
  add: (params: AddMonthlyExpensesRepository.Params) => Promise<void>;
}

export namespace AddMonthlyExpensesRepository {
  export type Params = AddExpenseInMonth.Params;
}
