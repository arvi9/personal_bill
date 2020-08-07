import { UpdateMonthlyExpenses } from "@/domain/usecases";

export abstract class ExpensePublisher {
  protected expensesListeners: UpdateMonthlyExpenses[];

  constructor(expensesListeners: UpdateMonthlyExpenses[]) {
    this.expensesListeners = expensesListeners;
  }

  addListener(expenseListener: UpdateMonthlyExpenses): void {
    this.expensesListeners.push(expenseListener);
  }

  removeListener(expenseListener: UpdateMonthlyExpenses): void {
    this.expensesListeners.slice(
      this.expensesListeners.indexOf(expenseListener),
      1
    );
  }

  abstract notifyListeners(): Promise<void>;
}
