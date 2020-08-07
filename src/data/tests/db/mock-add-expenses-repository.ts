import faker from "faker";
import { AddExpenseRepository } from "@/data/protocols";
import { mockAddExpense, mockAccount } from "@/domain/tests";

export class AddExpenseRepositoryMock implements AddExpenseRepository {
  params: any;
  expense = {
    ...mockAddExpense(),
    account: mockAccount(),
    id: faker.random.uuid(),
  };
  async add(
    params: AddExpenseRepository.Params
  ): Promise<AddExpenseRepository.Model> {
    this.params = params;
    return Promise.resolve(this.expense);
  }
}
