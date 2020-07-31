import faker from "faker";
import { DbAddExpense } from "./db-add-expense";
import { AddExpenseRepositorySpy } from "@/data/tests";
import { mockAddExpense } from "@/domain/tests/";

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
    const expense = mockAddExpense();
    await sut.add(expense);
    expect(addExpenseRepositorySpy.params).toEqual(expense);
  });
});
