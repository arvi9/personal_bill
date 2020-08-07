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
  it("should calls loadByDate with correct values if amount is 1", async () => {
    const account = mockAccount();
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const params = makeFakeParams(account);
    await sut.add(params);
    expect(monthlyExpensesRepositorySpy.loadByDateParams).toEqual({
      date: params.date,
      account: params.account,
    });
  });
  it("should calls loadByDate with correct values if amount is greater than  1", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
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
    expect(monthlyExpensesRepositorySpy.loadByDateParams).toEqual({
      date: params.date,
      finalDate: new Date(2020, 10, 6),
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
  it("should calls update 3 times and add 2 times if the amount is 5 and loadByDate returns 3", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const account = mockAccount();
    monthlyExpensesRepositorySpy.monthlyExpenses = [
      {
        value: 300,
        year: 2020,
        month: 8,
        account,
      },
      {
        value: 200,
        year: 2020,
        month: 9,
        account,
      },
      {
        value: 100,
        year: 2020,
        month: 10,
        account,
      },
    ];

    const params = {
      account: {
        id: account.id,
      },
      amount: 5,
      date: new Date(2020, 7, 6),
      value: faker.random.number(),
    };

    const addSpy = jest.spyOn(monthlyExpensesRepositorySpy, "add");
    const updateSpy = jest.spyOn(monthlyExpensesRepositorySpy, "update");

    await sut.add(params);

    expect(updateSpy).toHaveBeenNthCalledWith(1, {
      value: params.value + 300,
      account: params.account,
      month: 8,
      year: 2020,
    });
    expect(updateSpy).toHaveBeenNthCalledWith(2, {
      value: params.value + 200,
      account: params.account,
      month: 9,
      year: 2020,
    });
    expect(updateSpy).toHaveBeenNthCalledWith(3, {
      value: params.value + 100,
      account: params.account,
      month: 10,
      year: 2020,
    });
    expect(addSpy).toHaveBeenNthCalledWith(1, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 10),
    });
    expect(addSpy).toHaveBeenNthCalledWith(2, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 11),
    });
  });
  it("should calls update 3 times and not to call add if the amount is 3 and loadByDate returns 3", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const account = mockAccount();
    monthlyExpensesRepositorySpy.monthlyExpenses = [
      {
        value: 300,
        year: 2020,
        month: 8,
        account,
      },
      {
        value: 200,
        year: 2020,
        month: 9,
        account,
      },
      {
        value: 100,
        year: 2020,
        month: 10,
        account,
      },
    ];

    const params = {
      account: {
        id: account.id,
      },
      amount: 3,
      date: new Date(2020, 7, 6),
      value: faker.random.number(),
    };

    const addSpy = jest.spyOn(monthlyExpensesRepositorySpy, "add");
    const updateSpy = jest.spyOn(monthlyExpensesRepositorySpy, "update");

    await sut.add(params);

    expect(updateSpy).toHaveBeenNthCalledWith(1, {
      value: params.value + 300,
      account: params.account,
      month: 8,
      year: 2020,
    });
    expect(updateSpy).toHaveBeenNthCalledWith(2, {
      value: params.value + 200,
      account: params.account,
      month: 9,
      year: 2020,
    });
    expect(updateSpy).toHaveBeenNthCalledWith(3, {
      value: params.value + 100,
      account: params.account,
      month: 10,
      year: 2020,
    });
    expect(addSpy).not.toHaveBeenCalled();
  });
  it("should calls update 1 time and add 2 times if the amount is 3 and loadByDate returns 1", async () => {
    const { sut, monthlyExpensesRepositorySpy } = makeSut();
    const account = mockAccount();
    monthlyExpensesRepositorySpy.monthlyExpenses = [
      {
        value: 300,
        year: 2020,
        month: 8,
        account,
      },
    ];

    const params = {
      account: {
        id: account.id,
      },
      amount: 3,
      date: new Date(2020, 7, 6),
      value: 100,
    };

    const addSpy = jest.spyOn(monthlyExpensesRepositorySpy, "add");
    const updateSpy = jest.spyOn(monthlyExpensesRepositorySpy, "update");

    await sut.add(params);

    expect(updateSpy).toHaveBeenNthCalledWith(1, {
      value: params.value + 300,
      account: params.account,
      month: 8,
      year: 2020,
    });
    expect(addSpy).toHaveBeenNthCalledWith(1, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 8),
    });
    expect(addSpy).toHaveBeenNthCalledWith(2, {
      value: params.value,
      account: params.account,
      date: new Date(2020, 9),
    });
  });
});
