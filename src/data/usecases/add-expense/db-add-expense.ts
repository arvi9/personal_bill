import { AddExpense } from "@/domain/usecases";
import { AddExpenseRepository } from "@/data/protocols";

export class DbAddExpense {
  constructor(private readonly addExpenseRepository: AddExpenseRepository) {}

  async add(params: AddExpense.Params): Promise<AddExpense.Model> {
    return this.addExpenseRepository.add(params);
  }
}
