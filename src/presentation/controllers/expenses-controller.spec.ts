import { ExpensesController } from "./expenses-controller";
import { mockAddExpense } from "@/domain/tests";
import { ValidationSpy } from "@/presentation/test";
import { badRequest } from "../protocols/http";

type SutTypes = {
  sut: ExpensesController;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new ExpensesController(validationSpy);
  return {
    sut,
    validationSpy,
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
});
