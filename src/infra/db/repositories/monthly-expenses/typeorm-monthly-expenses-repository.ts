import { Repository, getRepository } from "typeorm";
import { getMonth, getYear } from "date-fns";
import { MonthlyExpensesRepository } from "@/data/protocols";
import { MonthlyExpensesModel } from "@/infra/db/models";

export class TypeOrmMonthlyExpensesRepository
  implements MonthlyExpensesRepository {
  private repository: Repository<MonthlyExpensesModel>;

  constructor() {
    this.repository = getRepository(MonthlyExpensesModel);
  }

  async add(params: MonthlyExpensesRepository.Params): Promise<void> {}

  async update(params: MonthlyExpensesRepository.UpdateParams): Promise<void> {}

  async loadByDate(
    params: MonthlyExpensesRepository.LoadByDateParams
  ): Promise<MonthlyExpensesRepository.Model[]> {
    const year = getYear(params.date);
    const month = getMonth(params.date) + 1;

    const expenses = await this.repository.find({
      where: {
        year,
        month,
        account: params.account,
      },
    });

    return expenses.map((expense) => ({
      ...expense,
      value: Number(expense.value),
    }));
  }
}
