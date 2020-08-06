import { MonthlyExpensesRepository } from "@/data/protocols";
import { mockMonthlyExpenses } from "@/domain/tests";

export class MonthlyExpensesRepositorySpy implements MonthlyExpensesRepository {
  addParams: any;
  updateParams: any;
  loadByDateParams: any;
  monthlyExpenses = mockMonthlyExpenses();

  async add(params: MonthlyExpensesRepository.Params): Promise<void> {
    this.addParams = params;
  }

  async update(params: MonthlyExpensesRepository.UpdateParams): Promise<void> {
    this.updateParams = params;
  }

  async loadByDate(
    params: MonthlyExpensesRepository.Params
  ): Promise<MonthlyExpensesRepository.Model[]> {
    this.loadByDateParams = params;
    return this.monthlyExpenses;
  }
}
