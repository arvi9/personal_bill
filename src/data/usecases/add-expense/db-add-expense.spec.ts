import faker from "faker";
import { DbAddExpense } from "./db-add-expense";
import { AddExpenseRepositoryMock } from "@/data/tests";
import { mockAddExpense } from "@/domain/tests/";

type SutTypes = {
  sut: DbAddExpense;
  addExpenseRepositoryMock: AddExpenseRepositoryMock;
};

const makeSut = (): SutTypes => {
  const addExpenseRepositoryMock = new AddExpenseRepositoryMock();
  const sut = new DbAddExpense(addExpenseRepositoryMock);
  return {
    sut,
    addExpenseRepositoryMock,
  };
};

describe("DbAddExpense", () => {
  it("should calls AddExpenseRepository with correct values", async () => {
    const { sut, addExpenseRepositoryMock } = makeSut();
    const expense = mockAddExpense();
    await sut.add(expense);
    expect(addExpenseRepositoryMock.params).toEqual(expense);
  });
  it("should returns the created expense", async () => {
    const { sut, addExpenseRepositoryMock } = makeSut();
    const expense = mockAddExpense();
    const createdExpense = {
      ...expense,
      id: faker.random.uuid(),
      accountId: expense.account.id,
    };
    jest
      .spyOn(addExpenseRepositoryMock, "add")
      .mockResolvedValueOnce(createdExpense);
    const result = await sut.add(expense);
    expect(result).toEqual(createdExpense);
  });
});
