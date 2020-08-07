import faker from "faker";
import { DbAddExpense } from "./db-add-expense";
import { AddExpenseRepositoryMock, ExpenseListenerMock } from "@/data/tests";
import { mockAddExpense, mockAccount } from "@/domain/tests/";
import { AddExpense } from "@/domain/usecases";

type SutTypes = {
  sut: DbAddExpense;
  addExpenseRepositoryMock: AddExpenseRepositoryMock;
  expenseListenerMocks: ExpenseListenerMock[];
};

const makeSut = (): SutTypes => {
  const addExpenseRepositoryMock = new AddExpenseRepositoryMock();
  const expenseListenerMocks = [
    new ExpenseListenerMock(),
    new ExpenseListenerMock(),
  ];
  const sut = new DbAddExpense(addExpenseRepositoryMock, expenseListenerMocks);
  return {
    sut,
    addExpenseRepositoryMock,
    expenseListenerMocks,
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
    const createdExpense: AddExpense.Model = {
      ...expense,
      id: faker.random.uuid(),
      account: mockAccount(),
    };
    jest
      .spyOn(addExpenseRepositoryMock, "add")
      .mockResolvedValueOnce(createdExpense);
    const result = await sut.add(expense);
    expect(result).toEqual(createdExpense);
  });
  it("should calls notifyListeners with correct data", async () => {
    const { sut, addExpenseRepositoryMock, expenseListenerMocks } = makeSut();
    const data = {
      account: {
        id: addExpenseRepositoryMock.expense.account.id,
      },
      date: addExpenseRepositoryMock.expense.date,
      value: addExpenseRepositoryMock.expense.value,
      amount: 1,
    };

    await sut.add(mockAddExpense());
    expect(expenseListenerMocks[0].params).toEqual(data);
    expect(expenseListenerMocks[1].params).toEqual(data);
  });
});
