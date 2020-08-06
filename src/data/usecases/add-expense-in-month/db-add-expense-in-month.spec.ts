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
      value: params.value,
    });
  });
  it("should calls add if loadByDate if returns null", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    monthlyExpensesRepositorySpy.monthlyExpenses = null;
    const params = makeFakeParams();
    await sut.add(params);
    expect(monthlyExpensesRepositorySpy.addParams).toEqual({
      date: params.date,
      account: params.account,
      value: params.value,
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
  it("should calls amount times add if amount is greater than 1 and loadByDate returns empty", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    monthlyExpensesRepositorySpy.monthlyExpenses = [];
    const addSpy = jest.spyOn(monthlyExpensesRepositorySpy, "add");
    const account = mockAccount();
    const params = {
      account: {
        id: account.id,
      },
      amount: 4,
      date: new Date(2020, 7, 6),
      value: faker.random.number(),
    };
    await sut.add(params);
    expect(addSpy).toHaveBeenNthCalledWith(1, {
      value: params.value,
      account: params.account,
      date: params.date,
    });
    expect(addSpy).toHaveBeenNthCalledWith(2, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 8, 6),
    });
    expect(addSpy).toHaveBeenNthCalledWith(3, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 9, 6),
    });
    expect(addSpy).toHaveBeenNthCalledWith(4, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 10, 6),
    });
  });
});
