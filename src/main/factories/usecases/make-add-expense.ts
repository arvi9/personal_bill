import { AddExpense } from "@/domain/usecases";
import { DbAddExpense } from "@/data/usecases/add-expense/db-add-expense";
import { makeAddExpenseRepository } from "@/main/factories/infra";
import { makeUpdateMonthlyExpenses } from "./make-update-monthly-expenses";

export const makeAddExpense = (): AddExpense => {
  return new DbAddExpense(makeAddExpenseRepository(), [
    makeUpdateMonthlyExpenses(),
  ]);
};
