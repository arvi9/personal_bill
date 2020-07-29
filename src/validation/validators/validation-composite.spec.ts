import faker from "faker";
import { ValidationComposite } from "./validation-composite";
import { Validation } from "@/presentation/protocols";

class ValidationMock implements Validation {
  input: any;
  validate(input: any): Error {
    this.input = input;
    return null;
  }
}

describe("ValidationComposite", () => {
  it("should calls validate for each validation received", () => {
    const validationMock = new ValidationMock();
    const secondValidationMock = new ValidationMock();
    const sut = new ValidationComposite([validationMock, secondValidationMock]);
    const input = {
      field: faker.random.word(),
    };
    sut.validate(input);
    expect(validationMock.input).toEqual(input);
    expect(secondValidationMock.input).toEqual(input);
  });
});
