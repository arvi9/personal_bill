import { AddExpense } from "@/domain/usecases";
import {
  AddExpenseRepository,
  ExpensePublisher,
  ExpenseListener,
} from "@/data/protocols";

export class DbAddExpense extends ExpensePublisher implements AddExpense {
  private expense: AddExpense.Model;

  constructor(
    private readonly addExpenseRepository: AddExpenseRepository,
    protected expensesListeners: ExpenseListener[]
  ) {
    super(expensesListeners);
  }

  async add(params: AddExpense.Params): Promise<AddExpense.Model> {
    this.expense = await this.addExpenseRepository.add(params);
    await this.notifyListeners();
    return this.expense;
  }

  async notifyListeners(): Promise<void> {
    for (const listener of this.expensesListeners) {
      await listener.update({
        account: {
          id: this.expense.account.id,
        },
        amount: 1,
        date: this.expense.date,
        value: this.expense.value,
      });
    }
  }
}
