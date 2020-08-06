import { AddExpenseInMonth } from "@/domain/usecases";
import { AddMonthlyExpensesRepository } from "@/data/protocols";

export class DbAddExpenseInMonth implements AddExpenseInMonth {
  constructor(
    private readonly addMonthlyExpenseRepository: AddMonthlyExpensesRepository
  ) {}

  async add(params: AddExpenseInMonth.Params): Promise<void> {
    await this.addMonthlyExpenseRepository.add(params);
  }
}
