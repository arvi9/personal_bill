import { LoadMonthlyExpensesByDateRepository } from "@/data/protocols";

export class LoadMonthlyExpenseByDateRepositorySpy
  implements LoadMonthlyExpensesByDateRepository {
  params: any;
  async loadByDate(
    params: LoadMonthlyExpensesByDateRepository.Params
  ): Promise<LoadMonthlyExpensesByDateRepository.Model> {
    this.params = params;
    return null;
  }
}
