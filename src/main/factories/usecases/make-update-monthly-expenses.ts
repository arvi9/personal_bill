import { UpdateMonthlyExpenses } from "@/domain/usecases";
import { DbUpdateMonthlyExpenses } from "@/data/usecases";
import { TypeOrmMonthlyExpensesRepository } from "@/infra/db/repositories";

export const makeUpdateMonthlyExpenses = (): UpdateMonthlyExpenses => {
  const monthlyExpensesRepository = new TypeOrmMonthlyExpensesRepository();
  return new DbUpdateMonthlyExpenses(monthlyExpensesRepository);
};
