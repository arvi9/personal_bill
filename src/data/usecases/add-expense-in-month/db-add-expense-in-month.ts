import { AddExpenseInMonth } from "@/domain/usecases";
import { MonthlyExpensesRepository } from "@/data/protocols";
import { MonthlyExpense } from "@/domain/models";

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
    } else {
      await this.updateMonthlyExpenses(monthlyExpenses, params);
    }
  }

  private async updateMonthlyExpenses(
    monthlyExpenses: MonthlyExpense[],
    params: AddExpenseInMonth.Params
  ): Promise<void> {
    const onlyValues = (expense: MonthlyExpense) => expense.value;
    const total = (prev: number, curr: number) => prev + curr;

    await this.monthlyExpensesRepository.update({
      account: params.account,
      month: monthlyExpenses[0].month,
      year: monthlyExpenses[0].year,
      value: monthlyExpenses.map(onlyValues).reduce(total) + params.value,
    });
  }
}
