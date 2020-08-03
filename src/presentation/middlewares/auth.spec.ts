import faker from "faker";
import { AuthMiddleware } from "./auth";
import { forbidden, HttpRequest, success } from "@/presentation/protocols/http";
import { AccessDeniedError } from "@/presentation/errors";
import { LoadAccountByTokenSpy } from "@/presentation/test";

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenSpy: LoadAccountByTokenSpy;
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy();
  const sut = new AuthMiddleware(loadAccountByTokenSpy);
  return {
    sut,
    loadAccountByTokenSpy,
  };
};

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    "x-access-token": faker.random.uuid(),
  },
});

describe("Auth Middleware", () => {
  it("should return 403 if no x-access-token exists in headers", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  it("should call LoadAccountByToken with correct accessToken", async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(loadAccountByTokenSpy.accessToken).toBe(
      httpRequest.headers["x-access-token"]
    );
  });
  it("should returns 403 if LoadAccountByToken returns falsy", async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    loadAccountByTokenSpy.account = null;
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  it("should returns 200 if LoadAccountByToken returns an account", async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(
      success({
        accountId: loadAccountByTokenSpy.account.id,
      })
    );
  });
});
