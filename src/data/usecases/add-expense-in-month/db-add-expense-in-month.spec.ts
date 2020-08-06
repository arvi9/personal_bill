import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { mockAccount, mockMonthlyExpense } from "@/domain/tests";
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
  it("should calls loadByDate with correct values", async () => {
    const account = mockAccount();
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const params = makeFakeParams(account);
    await sut.add(params);
    expect(monthlyExpensesRepositorySpy.loadByDateParams).toEqual({
      date: params.date,
      account: params.account,
    });
  });
  it("should calls add if loadByDate if returns empty", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    monthlyExpensesRepositorySpy.monthlyExpenses = [];
    const params = makeFakeParams();
    await sut.add(params);
    expect(monthlyExpensesRepositorySpy.addParams).toEqual({
      date: params.date,
      account: params.account,
    });
  });
  it("should calls update if loadByDate return expenses", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const account = mockAccount();
    const monthlyExpenses = monthlyExpensesRepositorySpy.monthlyExpenses;
    const params = makeFakeParams(account);
    await sut.add(params);

    const expensesValue = monthlyExpenses
      .map((expense) => expense.value)
      .reduce((prev, curr) => prev + curr);

    expect(monthlyExpensesRepositorySpy.updateParams).toEqual({
      month: monthlyExpenses[0].month,
      year: monthlyExpenses[0].year,
      account: {
        id: account.id,
      },
      value: expensesValue + params.value,
    });
  });
});
