import faker from "faker";
import { InvalidComparationError } from "@/presentation/errors";
import { CompareFieldsValidation } from "./compare-fields-validation";

describe("CompareFieldsValidation", () => {
  it("should returns InvalidComparationError if validation fails", () => {
    const sut = new CompareFieldsValidation("field", "comparationField");
    const input = {
      field: faker.random.word(),
      comparationField: faker.random.words(3),
    };
    const result = sut.validate(input);
    expect(result).toEqual(new InvalidComparationError());
  });
});
