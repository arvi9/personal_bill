import { AddExpenseInMonth } from "@/domain/usecases";
import { LoadMonthlyExpensesByDateRepository } from "@/data/protocols";

export class DbAddExpenseInMonth implements AddExpenseInMonth {
  constructor(
    private readonly loadMonthlyExpensesByDateRepository: LoadMonthlyExpensesByDateRepository
  ) {}

  async add(params: AddExpenseInMonth.Params): Promise<void> {
    await this.loadMonthlyExpensesByDateRepository.loadByDate({
      date: params.date,
      account: params.account,
    });
  }
}
