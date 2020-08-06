import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { AddMonthlyExpensesRepository } from "@/data/protocols";

class AddMonthlyExpensesRepositoryMock implements AddMonthlyExpensesRepository {
  params: any;
  async add(params: AddMonthlyExpensesRepository.Params): Promise<void> {
    this.params = params;
  }
}

describe("DbAddExpenseInMonth", () => {
  it("should AddMonthlyExpensesRepository with correct value and date", async () => {
    const addMonthlyExpensesRepositoryMock = new AddMonthlyExpensesRepositoryMock();
    const sut = new DbAddExpenseInMonth(addMonthlyExpensesRepositoryMock);
    const params = {
      value: faker.random.number(),
      date: faker.date.recent(),
    };
    await sut.add(params);
    expect(addMonthlyExpensesRepositoryMock.params).toEqual(params);
  });
});
