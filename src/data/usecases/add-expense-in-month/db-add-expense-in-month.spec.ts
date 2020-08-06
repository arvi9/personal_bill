import faker from "faker";
import { DbAddExpenseInMonth } from "./db-add-expense-in-month";
import { mockAccount } from "@/domain/tests";
import {
  LoadMonthlyExpenseByDateRepositorySpy,
  AddMonthlyExpenseRepositoryMock,
} from "@/data/tests";

type SutTypes = {
  sut: DbAddExpenseInMonth;
  loadMonthlyExpenseByDateRepositorySpy: LoadMonthlyExpenseByDateRepositorySpy;
  addMonthlyExpenseRepositoryMock: AddMonthlyExpenseRepositoryMock;
};

const makeSut = (): SutTypes => {
  const loadMonthlyExpenseByDateRepositorySpy = new LoadMonthlyExpenseByDateRepositorySpy();
  const addMonthlyExpenseRepositoryMock = new AddMonthlyExpenseRepositoryMock();
  const sut = new DbAddExpenseInMonth(
    loadMonthlyExpenseByDateRepositorySpy,
    addMonthlyExpenseRepositoryMock
  );
  return {
    sut,
    loadMonthlyExpenseByDateRepositorySpy,
    addMonthlyExpenseRepositoryMock,
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
  it("should calls LoadMonthlyExpensesByDateRepository with correct values", async () => {
    const account = mockAccount();
    const { sut, loadMonthlyExpenseByDateRepositorySpy } = makeSut();
    const params = makeFakeParams(account);
    await sut.add(params);
    expect(loadMonthlyExpenseByDateRepositorySpy.params).toEqual({
      date: params.date,
      account: params.account,
    });
  });
  it("should calls AddMonthlyExpenseRepository if LoadMonthlyExpensesByDateRepository returns empty", async () => {
    const {
      sut,
      loadMonthlyExpenseByDateRepositorySpy,
      addMonthlyExpenseRepositoryMock,
    } = makeSut();
    loadMonthlyExpenseByDateRepositorySpy.monthlyExpenses = [];
    const params = makeFakeParams();
    await sut.add(params);
    expect(addMonthlyExpenseRepositoryMock.params).toEqual({
      date: params.date,
      account: params.account,
    });
  });
});
