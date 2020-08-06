import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { LoadMonthlyExpensesByDateRepository } from "@/data/protocols";
import { mockAccount } from "@/domain/tests";

class LoadMonthlyExpenseByDateRepositorySpy
  implements LoadMonthlyExpensesByDateRepository {
  params: any;
  async loadByDate(
    params: LoadMonthlyExpensesByDateRepository.Params
  ): Promise<LoadMonthlyExpensesByDateRepository.Model> {
    this.params = params;
    return null;
  }
}

describe("DbAddExpenseInMonth", () => {
  it("should calls LoadMonthlyExpensesByDateRepository with correct values", async () => {
    const account = mockAccount();
    const loadMonthlyExpenseByDateRepositorySpy = new LoadMonthlyExpenseByDateRepositorySpy();
    const sut = new DbAddExpenseInMonth(loadMonthlyExpenseByDateRepositorySpy);
    const params = {
      account: {
        id: account.id,
      },
      amount: 1,
      date: faker.date.recent(),
      value: faker.random.number(),
    };
    await sut.add(params);
    expect(loadMonthlyExpenseByDateRepositorySpy.params).toEqual({
      date: params.date,
      account: params.account,
    });
  });
});
