import { MonthlyExpensesRepository } from "@/data/protocols";

export class TypeOrmMonthlyExpensesRepository
  implements MonthlyExpensesRepository {
  async add(params: MonthlyExpensesRepository.Params): Promise<void> {}

  async update(params: MonthlyExpensesRepository.UpdateParams): Promise<void> {}

  async loadByDate(
    params: MonthlyExpensesRepository.LoadByDateParams
  ): Promise<MonthlyExpensesRepository.Model[]> {
    return null;
  }
}
