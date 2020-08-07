import { ExpenseListener } from "./expense-listener";

export abstract class ExpensePublisher {
  protected expensesListeners: ExpenseListener[];

  constructor(expensesListeners: ExpenseListener[]) {
    this.expensesListeners = expensesListeners;
  }

  addListener(expenseListener: ExpenseListener): void {
    this.expensesListeners.push(expenseListener);
  }

  removeListener(expenseListener: ExpenseListener): void {
    this.expensesListeners.slice(
      this.expensesListeners.indexOf(expenseListener),
      1
    );
  }

  abstract notifyListeners(): Promise<void>;
}
