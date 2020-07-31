import { AddExpense } from "@/domain/usecases";

export interface AddExpenseRepository {
  add: (
    params: AddExpenseRepository.Params
  ) => Promise<AddExpenseRepository.Model>;
}

export namespace AddExpenseRepository {
  export type Params = AddExpense.Params;
  export type Model = AddExpense.Model;
}
