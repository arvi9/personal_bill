import faker from "faker";
import { EmailValidation } from "./email-validation";
import { EmailValidationError } from "@/presentation/errors";

describe("EmailValidation", () => {
  it("should returns EmailValidationError if validation fails", () => {
    const sut = new EmailValidation("email");
    const input = {
      email: faker.random.word(),
    };
    const result = sut.validate(input);
    expect(result).toEqual(new EmailValidationError(input.email));
  });
  it("should returns null if validation succeds", () => {
    const sut = new EmailValidation("email");
    const input = {
      email: faker.internet.email(),
    };
    const result = sut.validate(input);
    expect(result).toBeNull();
  });
});
