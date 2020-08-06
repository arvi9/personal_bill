import {
  LoadMonthlyExpensesByDateRepository,
  AddMonthlyExpensesRepository,
} from "@/data/protocols";
import { mockMonthlyExpenses } from "@/domain/tests";

export class LoadMonthlyExpenseByDateRepositorySpy
  implements LoadMonthlyExpensesByDateRepository {
  params: any;
  monthlyExpenses = mockMonthlyExpenses();
  async loadByDate(
    params: LoadMonthlyExpensesByDateRepository.Params
  ): Promise<LoadMonthlyExpensesByDateRepository.Model> {
    this.params = params;
    return this.monthlyExpenses;
  }
}

export class AddMonthlyExpenseRepositoryMock
  implements AddMonthlyExpensesRepository {
  params: any;
  async add(params: AddMonthlyExpensesRepository.Params): Promise<void> {
    this.params = params;
  }
}
