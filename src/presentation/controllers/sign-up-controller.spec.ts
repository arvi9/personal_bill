import faker from "faker";
import { SignUpController } from "./sign-up-controller";
import { ValidationSpy, SignUpSpy } from "@/presentation/test";
import { HttpRequest, badRequest, serverError } from "../protocols";
import { EmailAlreadyInUseError } from "@/domain/errors";

type SutTypes = {
  sut: SignUpController;
  validationSpy: ValidationSpy;
  signUpSpy: SignUpSpy;
};

const makeSut = (): SutTypes => {
  const signUpSpy = new SignUpSpy();
  const validationSpy = new ValidationSpy();
  const sut = new SignUpController(validationSpy, signUpSpy);
  return {
    sut,
    validationSpy,
    signUpSpy,
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
  it("should calls SignUp with correct values", async () => {
    const { sut, signUpSpy } = makeSut();
    const params = makeFakeRequest();
    await sut.handle(params);
    expect(signUpSpy.params).toEqual({
      email: params.body.email,
      name: params.body.name,
      password: params.body.password,
    });
  });
  it("should returns 400 if SignUp returns null", async () => {
    const { sut, signUpSpy } = makeSut();
    signUpSpy.account = null;
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(new EmailAlreadyInUseError()));
  });
  it("should returns 500 SignUp throws", async () => {
    const { sut, signUpSpy } = makeSut();
    jest
      .spyOn(signUpSpy, "signup")
      .mockRejectedValueOnce(new Error("Internal Server Error"));
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(serverError(new Error("Internal Server Error")));
  });
});
