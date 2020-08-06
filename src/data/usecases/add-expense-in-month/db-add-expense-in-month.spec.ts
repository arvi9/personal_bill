import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { mockAccount } from "@/domain/tests";
import { LoadMonthlyExpenseByDateRepositorySpy } from "@/data/tests";

type SutTypes = {
  sut: DbAddExpenseInMonth;
  loadMonthlyExpenseByDateRepositorySpy: LoadMonthlyExpenseByDateRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadMonthlyExpenseByDateRepositorySpy = new LoadMonthlyExpenseByDateRepositorySpy();
  const sut = new DbAddExpenseInMonth(loadMonthlyExpenseByDateRepositorySpy);
  return {
    sut,
    loadMonthlyExpenseByDateRepositorySpy,
  };
};

describe("DbAddExpenseInMonth", () => {
  it("should calls LoadMonthlyExpensesByDateRepository with correct values", async () => {
    const account = mockAccount();
    const { sut, loadMonthlyExpenseByDateRepositorySpy } = makeSut();
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
