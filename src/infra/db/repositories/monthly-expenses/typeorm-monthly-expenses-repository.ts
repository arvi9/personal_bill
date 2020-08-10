import { Repository, getRepository, Between } from "typeorm";
import { getMonth, getYear, addMonths } from "date-fns";
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

  async loadByDate({
    account,
    date,
    finalDate,
  }: MonthlyExpensesRepository.LoadByDateParams): Promise<
    MonthlyExpensesRepository.Model[]
  > {
    const year = getYear(date);
    const month = getMonth(date) + 1;

    const whereOptions = finalDate
      ? {
          month: Between(month, getMonth(finalDate) + 1),
          year,
          account,
          order: {
            month: "ASC",
          },
        }
      : {
          where: {
            month,
            year,
            account,
          },
        };

    const expenses = await this.repository.find(whereOptions);

    return expenses.map((expense) => ({
      ...expense,
      value: Number(expense.value),
    }));
  }
}
