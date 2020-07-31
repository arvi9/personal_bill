import { getRepository } from "typeorm";
import { AddExpenseRepository } from "@/data/protocols";
import { ExpenseModel } from "@/infra/db/models";

export class TypeOrmAddExpenseRepository implements AddExpenseRepository {
  async add(
    params: AddExpenseRepository.Params
  ): Promise<AddExpenseRepository.Model> {
    const repository = getRepository(ExpenseModel);
    const expense = repository.create({
      description: params.description,
      date: params.date,
      accountId: params.account.id,
      value: params.value,
    });

    await repository.save(expense);
    return null;
  }
}
