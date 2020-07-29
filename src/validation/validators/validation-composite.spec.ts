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

const makeInput = () => ({ field: faker.random.word() });

describe("ValidationComposite", () => {
  it("should calls validate for each validation received", () => {
    const { sut, validationsSpy } = makeSut();
    const input = makeInput();
    sut.validate(input);
    expect(validationsSpy[0].input).toEqual(input);
    expect(validationsSpy[1].input).toEqual(input);
  });
  it("should returns error if any validation returns error", () => {
    const { sut, validationsSpy } = makeSut();
    const error = new Error("Validation Error");
    validationsSpy[0].validationError = error;
    const validation = sut.validate(makeInput());
    expect(validation).toEqual(error);
  });
});
