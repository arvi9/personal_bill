import { AddExpenseInMonth } from "@/domain/usecases";
import { MonthlyExpensesRepository } from "@/data/protocols";

export class DbAddExpenseInMonth implements AddExpenseInMonth {
  constructor(
    private readonly monthlyExpensesRepository: MonthlyExpensesRepository
  ) {}

  async add(params: AddExpenseInMonth.Params): Promise<void> {
    const monthlyExpenses = await this.monthlyExpensesRepository.loadByDate({
      date: params.date,
      account: params.account,
    });

    if (!monthlyExpenses.length) {
      await this.monthlyExpensesRepository.add({
        account: params.account,
        date: params.date,
      });
    }
  }
}
