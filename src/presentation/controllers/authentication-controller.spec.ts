import faker from "faker";
import { AuthenticationController } from "./authentication-controller";
import {
  badRequest,
  unauthorized,
  serverError,
  success,
  HttpRequest,
} from "../protocols/http";
import { UnauthorizedError, ServerError } from "@/domain/errors";
import { ValidationSpy, AuthenticateSpy } from "../test";
import { RequiredFieldError } from "../errors";

type SutTypes = {
  sut: AuthenticationController;
  authenticateSpy: AuthenticateSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const authenticateSpy = new AuthenticateSpy();
  const validationSpy = new ValidationSpy();
  const sut = new AuthenticationController(authenticateSpy, validationSpy);
  return { sut, authenticateSpy, validationSpy };
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
});

describe("AuthenticationController", () => {
  it("should returns bad request if body is undefined", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({} as HttpRequest);
    expect(response).toEqual(badRequest(new RequiredFieldError("body")));
  });
  it("should calls validation with correct input", async () => {
    const { sut, validationSpy } = makeSut();
    const request = makeFakeRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request.body);
  });
  it("should returns bad request if validation fails", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.validationError = new Error("Missing param error");
    const response = await sut.handle(makeFakeRequest());
    expect(response).toEqual(badRequest(validationSpy.validationError));
  });
  it("should calls Authenticate use case with correct email and password", async () => {
    const { sut, authenticateSpy } = makeSut();
    const httpRequest = {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    };
    await sut.handle(httpRequest);
    expect(authenticateSpy.params).toEqual(httpRequest.body);
  });
  it("should returns unauthorized if Authenticate returns falsy", async () => {
    const { sut, authenticateSpy } = makeSut();
    authenticateSpy.account = null;
    const response = await sut.handle({
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
    expect(response).toEqual(unauthorized(new UnauthorizedError()));
  });
  it("should returns server error if Authenticate throws", async () => {
    const { sut, authenticateSpy } = makeSut();
    jest.spyOn(authenticateSpy, "auth").mockImplementationOnce(() => {
      throw new Error();
    });
    const response = await sut.handle({
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
    expect(response).toEqual(serverError(new ServerError()));
  });
  it("should returns ok with access token and account on success", async () => {
    const { sut, authenticateSpy } = makeSut();
    const response = await sut.handle({
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
    expect(response).toEqual(success(authenticateSpy.account));
  });
});
