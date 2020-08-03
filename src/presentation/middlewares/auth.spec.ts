import faker from "faker";
import { AuthMiddleware } from "./auth";
import { forbidden } from "@/presentation/protocols/http";
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

describe("Auth Middleware", () => {
  it("should return 403 if no x-access-token exists in headers", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
  it("should call LoadAccountByToken with correct accessToken", async () => {
    const { sut, loadAccountByTokenSpy } = makeSut();
    const httpRequest = {
      headers: {
        "x-access-token": faker.random.uuid(),
      },
    };
    await sut.handle(httpRequest);
    expect(loadAccountByTokenSpy.accessToken).toBe(
      httpRequest.headers["x-access-token"]
    );
  });
});
