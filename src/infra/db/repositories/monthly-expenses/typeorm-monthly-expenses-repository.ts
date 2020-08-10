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

    let expenses: MonthlyExpensesModel[] = [];

    if (finalDate) {
      expenses = await this.repository.find({
        month: Between(month, getMonth(finalDate) + 1),
        year,
        account,
        order: {
          month: "ASC",
        },
      });
    } else {
      expenses = await this.repository.find({
        where: {
          month,
          year,
          account,
        },
      });
    }

    return expenses.map((expense) => ({
      ...expense,
      value: Number(expense.value),
    }));
  }
}
