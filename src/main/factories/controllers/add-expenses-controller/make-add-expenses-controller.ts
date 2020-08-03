import { AddExpensesController } from "@/presentation/controllers";
import { makeAddExpense } from "@/main/factories/usecases";
import { makeAddExpensesControllerValidation } from "./make-add-expenses-controller-validation";

export const makeAddExpensesController = (): AddExpensesController => {
  return new AddExpensesController(
    makeAddExpensesControllerValidation(),
    makeAddExpense()
  );
};
