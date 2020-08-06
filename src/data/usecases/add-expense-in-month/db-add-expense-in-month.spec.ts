import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { mockAccount } from "@/domain/tests";
import { MonthlyExpensesRepositorySpy } from "@/data/tests";

type SutTypes = {
  sut: DbAddExpenseInMonth;
  monthlyExpensesRepositorySpy: MonthlyExpensesRepositorySpy;
};

const makeSut = (): SutTypes => {
  const monthlyExpensesRepositorySpy = new MonthlyExpensesRepositorySpy();
  const sut = new DbAddExpenseInMonth(monthlyExpensesRepositorySpy);
  return {
    sut,
    monthlyExpensesRepositorySpy,
  };
};

const makeFakeParams = (account = mockAccount(), amount = 1) => ({
  account: {
    id: account.id,
  },
  amount,
  date: faker.date.recent(),
  value: faker.random.number(),
});

describe("DbAddExpenseInMonth", () => {
  it("should calls MonthlyExpensesRepository.loadByDate with correct values", async () => {
    const account = mockAccount();
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const params = makeFakeParams(account);
    await sut.add(params);
    expect(monthlyExpensesRepositorySpy.params).toEqual({
      date: params.date,
      account: params.account,
    });
  });
  it("should calls MonthlyExpensesRepository.add if MonthlyExpensesRepository.loadByDate returns empty", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    monthlyExpensesRepositorySpy.monthlyExpenses = [];
    const params = makeFakeParams();
    await sut.add(params);
    expect(monthlyExpensesRepositorySpy.params).toEqual({
      date: params.date,
      account: params.account,
    });
  });
});
