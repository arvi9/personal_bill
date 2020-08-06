import { addMonths } from "date-fns";
import { AddExpenseInMonth } from "@/domain/usecases";
import { MonthlyExpensesRepository } from "@/data/protocols";
import { MonthlyExpense } from "@/domain/models";

export class DbAddExpenseInMonth implements AddExpenseInMonth {
  constructor(
    private readonly monthlyExpensesRepository: MonthlyExpensesRepository
  ) {}

  async add(params: AddExpenseInMonth.Params): Promise<void> {
    const loadByDateParams = {
      date: params.date,
      account: params.account,
    };

    if (params.amount > 1) {
      Object.assign(loadByDateParams, {
        finalDate: addMonths(params.date, params.amount - 1),
      });
    }

    const monthlyExpenses = await this.monthlyExpensesRepository.loadByDate(
      loadByDateParams
    );

    if (monthlyExpenses?.length) {
      for (const monthlyExpense of monthlyExpenses) {
        await this.monthlyExpensesRepository.update({
          account: params.account,
          month: monthlyExpense.month,
          year: monthlyExpense.year,
          value: monthlyExpense.value + params.value,
        });
      }

      if (params.amount > monthlyExpenses.length) {
        const { month, year } = monthlyExpenses.pop();
        for (let i = 0; i < params.amount - monthlyExpenses.length; i++) {
          await this.monthlyExpensesRepository.add({
            account: params.account,
            value: params.value,
            date: addMonths(new Date(year, month), i),
          });
        }
      }
      return;
    }

    for (let i = 0; i < params.amount; i++) {
      await this.monthlyExpensesRepository.add({
        account: params.account,
        date: addMonths(params.date, i),
        value: params.value,
      });
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
