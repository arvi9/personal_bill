import faker from "faker";
import { DbAddExpense } from "./db-add-expense";
import { mockAccount } from "@/domain/tests/mock-account";
import { AddExpenseRepositorySpy } from "@/data/tests";

type SutTypes = {
  sut: DbAddExpense;
  addExpenseRepositorySpy: AddExpenseRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addExpenseRepositorySpy = new AddExpenseRepositorySpy();
  const sut = new DbAddExpense(addExpenseRepositorySpy);
  return {
    sut,
    addExpenseRepositorySpy,
  };
};

describe("DbAddExpense", () => {
  it("should calls AddExpenseRepository with correct values", async () => {
    const { sut, addExpenseRepositorySpy } = makeSut();
    const expense = {
      date: faker.date.recent(),
      description: faker.random.words(),
      value: faker.random.number(),
      account: mockAccount(),
    };
    await sut.add(expense);
    expect(addExpenseRepositorySpy.params).toEqual(expense);
  });
});
