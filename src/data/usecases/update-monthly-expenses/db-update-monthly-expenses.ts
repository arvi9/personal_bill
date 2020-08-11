import { addMonths } from "date-fns";
import { UpdateMonthlyExpenses } from "@/domain/usecases";
import { MonthlyExpensesRepository } from "@/data/protocols";
import { MonthlyExpense } from "@/domain/models";

export class DbUpdateMonthlyExpenses implements UpdateMonthlyExpenses {
  constructor(
    private readonly monthlyExpensesRepository: MonthlyExpensesRepository
  ) {}

  async update(params: UpdateMonthlyExpenses.Params): Promise<void> {
    const loadByDateParams = {
      date: params.date,
      account: params.account,
    };

    if (params.amount > 1) {
      Object.assign(loadByDateParams, {
        finalDate: addMonths(new Date(params.date), params.amount - 1),
      });
    }

    const monthlyExpenses = await this.monthlyExpensesRepository.loadByDate(
      loadByDateParams
    );

    if (monthlyExpenses?.length) {
      await this.updateMonthlyExpenses(monthlyExpenses, params);

      if (params.amount > monthlyExpenses.length) {
        await this.addRestMonthlyExpenses(monthlyExpenses, params);
      }
      return;
    }

    await this.addMonthlyExpenses(params);
  }

  private async addMonthlyExpenses(
    params: UpdateMonthlyExpenses.Params
  ): Promise<void> {
    for (let i = 0; i < params.amount; i++) {
      await this.monthlyExpensesRepository.add({
        account: params.account,
        date: addMonths(new Date(params.date), i),
        value: params.value,
      });
    }
  }

  private async addRestMonthlyExpenses(
    monthlyExpenses: Omit<MonthlyExpense, "id">[],
    params: UpdateMonthlyExpenses.Params
  ): Promise<void> {
    const { month, year } = monthlyExpenses.pop();
    for (let i = 0; i < params.amount - monthlyExpenses.length - 1; i++) {
      await this.monthlyExpensesRepository.add({
        account: params.account,
        value: params.value,
        date: addMonths(new Date(year, month), i),
      });
    }
  }

  private async updateMonthlyExpenses(
    monthlyExpenses: Omit<MonthlyExpense, "id">[],
    params: UpdateMonthlyExpenses.Params
  ) {
    for (const monthlyExpense of monthlyExpenses) {
      await this.updateMonthlyExpense(monthlyExpense, params);
    }
  }

  private async updateMonthlyExpense(
    monthlyExpense: Omit<MonthlyExpense, "id">,
    params: UpdateMonthlyExpenses.Params
  ): Promise<void> {
    await this.monthlyExpensesRepository.update({
      account: params.account,
      month: monthlyExpense.month,
      year: monthlyExpense.year,
      value: monthlyExpense.value + params.value,
    });
  }
}
