import faker from "faker";
import { RequiredFieldValidation } from "./required-field-validation";
import { RequiredFieldError } from "@/presentation/errors";

describe("RequiredFieldValidation", () => {
  it("should returns RequiredFieldError if input doesn't contain the expected field", () => {
    const sut = new RequiredFieldValidation("anyField");
    const input = {
      anotherField: faker.random.word(),
    };
    const validation = sut.validate(input);
    expect(validation).toEqual(new RequiredFieldError("anyField"));
  });
});
