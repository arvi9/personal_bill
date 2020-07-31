import faker from "faker";
import { ExpensesController } from "./expenses-controller";
import { mockAddExpense } from "@/domain/tests";
import { ValidationSpy } from "@/presentation/test";
import { badRequest, serverError, created } from "../protocols/http";
import { AddExpense } from "@/domain/usecases";
import { ServerError } from "@/domain/errors";
import { Expense } from "@/domain/models";

type SutTypes = {
  sut: ExpensesController;
  validationSpy: ValidationSpy;
  addExpenseSpy: AddExpenseSpy;
};

class AddExpenseSpy implements AddExpense {
  params: any;
  expense = {
    id: faker.random.uuid(),
    accountId: faker.random.uuid(),
    date: faker.date.recent(),
    description: faker.random.words(),
    value: faker.random.number(),
  };
  async add(params: AddExpense.Params): Promise<AddExpense.Model> {
    this.params = params;
    return this.expense;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addExpenseSpy = new AddExpenseSpy();
  const sut = new ExpensesController(validationSpy, addExpenseSpy);
  return {
    sut,
    validationSpy,
    addExpenseSpy,
  };
};

const makeRequest = () => ({
  body: {
    ...mockAddExpense(),
  },
});

describe("ExpensesController", () => {
  it("should calls validation with correct values", async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = makeRequest();
    await sut.store(httpRequest);
    expect(validationSpy.input).toBe(httpRequest.body);
  });
  it("should returns bad request if validation fails", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.validationError = new Error("Validation Error");
    const httpResponse = await sut.store(makeRequest());
    expect(httpResponse).toEqual(badRequest(new Error("Validation Error")));
  });
  it("should calls AddExpense with correct values", async () => {
    const { sut, addExpenseSpy } = makeSut();
    const request = makeRequest();
    await sut.store(request);
    expect(addExpenseSpy.params).toEqual(request.body);
  });
  it("should returns server error if AddExpense throws", async () => {
    const { sut, addExpenseSpy } = makeSut();
    jest.spyOn(addExpenseSpy, "add").mockRejectedValueOnce(new Error());
    const response = await sut.store(makeRequest());
    expect(response).toEqual(serverError(new ServerError()));
  });
  it("should returns created on success", async () => {
    const { sut, addExpenseSpy } = makeSut();
    const response = await sut.store(makeRequest());
    expect(response).toEqual(created(addExpenseSpy.expense));
  });
});
