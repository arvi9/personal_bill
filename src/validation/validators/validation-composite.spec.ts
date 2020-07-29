import faker from "faker";
import { ValidationComposite } from "./validation-composite";
import { ValidationSpy } from "@/presentation/test";

type SutTypes = {
  sut: ValidationComposite;
  validationsSpy: ValidationSpy[];
};

const makeSut = (): SutTypes => {
  const validationsSpy = [new ValidationSpy(), new ValidationSpy()];
  const sut = new ValidationComposite(validationsSpy);
  return {
    sut,
    validationsSpy,
  };
};

describe("ValidationComposite", () => {
  it("should calls validate for each validation received", () => {
    const { sut, validationsSpy } = makeSut();
    const input = {
      field: faker.random.word(),
    };
    sut.validate(input);
    expect(validationsSpy[0].input).toEqual(input);
    expect(validationsSpy[1].input).toEqual(input);
  });
});
