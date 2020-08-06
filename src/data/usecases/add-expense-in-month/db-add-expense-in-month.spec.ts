import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { mockAccount } from "@/domain/tests";
import { LoadMonthlyExpenseByDateRepositorySpy } from "@/data/tests";

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
