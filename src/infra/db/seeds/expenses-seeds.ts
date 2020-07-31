import { Repository } from "typeorm";
import { ExpenseModel } from "../models";
import { mockAddExpense } from "@/domain/tests";

export const insertOneExpense = async (
  repository: Repository<ExpenseModel>,
  expense = mockAddExpense()
): Promise<void> => {
  const created = repository.create({
    accountId: expense.account.id,
    date: expense.date,
    value: expense.value,
    description: expense.description,
  });
  await repository.save(created);
};
