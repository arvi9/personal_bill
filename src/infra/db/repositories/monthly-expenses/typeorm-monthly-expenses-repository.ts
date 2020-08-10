import { Repository, getRepository, Between } from "typeorm";
import { getMonth, getYear, parseISO, format } from "date-fns";
import { MonthlyExpensesRepository } from "@/data/protocols";
import { MonthlyExpensesModel } from "@/infra/db/models";

export class TypeOrmMonthlyExpensesRepository
  implements MonthlyExpensesRepository {
  private repository: Repository<MonthlyExpensesModel>;

  constructor() {
    this.repository = getRepository(MonthlyExpensesModel);
  }

  async add({
    account,
    date,
    value,
  }: MonthlyExpensesRepository.Params): Promise<void> {
    const ISODate = new Date(date);
    const year = getYear(ISODate);
    const month = getMonth(ISODate) + 1;
    const monthlyExpense = this.repository.create({
      account,
      year,
      month,
      value,
    });
    await this.repository.save(monthlyExpense);
  }

  async update({
    year,
    month,
    account,
    value,
  }: MonthlyExpensesRepository.UpdateParams): Promise<void> {
    const expense = await this.repository.findOne({
      where: {
        year,
        month,
        account,
      },
    });

    expense.value = value;
    await this.repository.save(expense);
  }

  async loadByDate({
    account,
    date,
    finalDate,
  }: MonthlyExpensesRepository.LoadByDateParams): Promise<
    MonthlyExpensesRepository.Model[]
  > {
    const ISODate = new Date(date);
    const year = getYear(ISODate);
    const month = getMonth(ISODate) + 1;

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
