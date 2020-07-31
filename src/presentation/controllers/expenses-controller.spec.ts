import { ExpensesController } from "./expenses-controller";
import { mockAddExpense } from "@/domain/tests";
import { ValidationSpy } from "@/presentation/test";

describe("ExpensesController", () => {
  it("should calls validation with correct values", async () => {
    const validationSpy = new ValidationSpy();
    const sut = new ExpensesController(validationSpy);
    const httpRequest = {
      body: {
        ...mockAddExpense(),
      },
    };
    await sut.store(httpRequest);
    expect(validationSpy.input).toBe(httpRequest.body);
  });
});
