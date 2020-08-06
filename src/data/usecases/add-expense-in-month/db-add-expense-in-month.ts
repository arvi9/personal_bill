import { AddExpenseInMonth } from "@/domain/usecases";
import {
  LoadMonthlyExpensesByDateRepository,
  AddMonthlyExpensesRepository,
} from "@/data/protocols";

export class DbAddExpenseInMonth implements AddExpenseInMonth {
  constructor(
    private readonly loadMonthlyExpensesByDateRepository: LoadMonthlyExpensesByDateRepository,
    private readonly addMonthlyExpenseRepository: AddMonthlyExpensesRepository
  ) {}

  async add(params: AddExpenseInMonth.Params): Promise<void> {
    const monthlyExpenses = await this.loadMonthlyExpensesByDateRepository.loadByDate(
      {
        date: params.date,
        account: params.account,
      }
    );

    if (!monthlyExpenses.length) {
      await this.addMonthlyExpenseRepository.add({
        account: params.account,
        date: params.date,
      });
    }
  }
}
