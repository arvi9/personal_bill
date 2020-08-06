import { MonthlyExpensesRepository } from "@/data/protocols";
import { mockMonthlyExpenses } from "@/domain/tests";

export class MonthlyExpensesRepositorySpy implements MonthlyExpensesRepository {
  params: any;
  monthlyExpenses = mockMonthlyExpenses();

  async add(params: MonthlyExpensesRepository.Params): Promise<void> {
    this.params = params;
  }

  async loadByDate(
    params: MonthlyExpensesRepository.Params
  ): Promise<MonthlyExpensesRepository.Model[]> {
    this.params = params;
    return this.monthlyExpenses;
  }
}
