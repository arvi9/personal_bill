import faker from "faker";
import { SignUpController } from "./sign-up-controller";
import { ValidationSpy } from "@/presentation/test";
import { HttpRequest, badRequest } from "../protocols";
import { exception } from "console";

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
  it("should returns 400 if validation returns an error", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.validationError = new Error("Validation Error");
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new Error("Validation Error")));
  });
});
