import faker from "faker";
import { SignUpController } from "./sign-up-controller";
import { ValidationSpy } from "@/presentation/test";
import { HttpRequest } from "../protocols";

type SutTypes = {
  sut: SignUpController;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(validationSpy);
  return {
    sut,
    validationSpy,
  };
};

const makeFakeRequest = (): HttpRequest => {
  const password = faker.internet.password();
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    },
  };
};

describe("SignUpController", () => {
  it("should calls validation with correct params", async () => {
    const { sut, validationSpy } = makeSut();
    const params = makeFakeRequest();
    await sut.handle(params);
    expect(validationSpy.input).toEqual(params.body);
  });
});
