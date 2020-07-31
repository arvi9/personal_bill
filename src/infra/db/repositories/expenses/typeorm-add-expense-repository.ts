import { getRepository, Repository } from "typeorm";
import { AddExpenseRepository } from "@/data/protocols";
import { ExpenseModel } from "@/infra/db/models";

export class TypeOrmAddExpenseRepository implements AddExpenseRepository {
  private repository: Repository<ExpenseModel>;

  constructor() {
    this.repository = getRepository(ExpenseModel);
  }

  async add(
    params: AddExpenseRepository.Params
  ): Promise<AddExpenseRepository.Model> {
    const expense = this.repository.create({
      description: params.description,
      date: params.date,
      accountId: params.account.id,
      value: params.value,
    });

    return this.repository.save(expense);
  }
}
