import faker from "faker";
import { ValidationComposite } from "./validation-composite";
import { ValidationSpy } from "@/presentation/test";

describe("ValidationComposite", () => {
  it("should calls validate for each validation received", () => {
    const validationSpy = new ValidationSpy();
    const secondValidationSpy = new ValidationSpy();
    const sut = new ValidationComposite([validationSpy, secondValidationSpy]);
    const input = {
      field: faker.random.word(),
    };
    sut.validate(input);
    expect(validationSpy.input).toEqual(input);
    expect(secondValidationSpy.input).toEqual(input);
  });
});
