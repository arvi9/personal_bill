import faker from "faker";
import {
  AccountsRepositorySpy,
  ComparationEncrypterSpy,
  GenerateAccessTokenSpy,
} from "@/data/tests";
import { DbAuthenticate } from "./db-authenticate";
import { Authenticate } from "@/domain/usecases";

type SutTypes = {
  sut: DbAuthenticate;
  accountsRepositorySpy: AccountsRepositorySpy;
  comparationEncrypterSpy: ComparationEncrypterSpy;
  generateAccessTokenSpy: GenerateAccessTokenSpy;
};

const makeSut = (): SutTypes => {
  const accountsRepositorySpy = new AccountsRepositorySpy();
  const comparationEncrypterSpy = new ComparationEncrypterSpy();
  const generateAccessTokenSpy = new GenerateAccessTokenSpy();
  const sut = new DbAuthenticate(
    accountsRepositorySpy,
    comparationEncrypterSpy,
    generateAccessTokenSpy
  );
  return {
    sut,
    accountsRepositorySpy,
    comparationEncrypterSpy,
    generateAccessTokenSpy,
  };
};

const makeAuthenticateParams = (): Authenticate.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("DbAuthenticate", () => {
  it("should calls LoadAccountByEmailRepository with correct values", async () => {
    const { sut, accountsRepositorySpy } = makeSut();
    const params = makeAuthenticateParams();
    await sut.auth(params);
    expect(accountsRepositorySpy.email).toEqual(params.email);
  });
  it("should returns falsy if LoadAccountByEmailRepository returns null", async () => {
    const { sut, accountsRepositorySpy } = makeSut();
    accountsRepositorySpy.account = null;
    const result = await sut.auth(makeAuthenticateParams());
    expect(result).toBeFalsy();
  });
  it("should throws if LoadAccountByEmailRepository throws", () => {
    const { sut, accountsRepositorySpy } = makeSut();
    jest.spyOn(accountsRepositorySpy, "load").mockImplementationOnce(() => {
      throw new Error();
    });
    const result = sut.auth(makeAuthenticateParams());
    expect(result).rejects.toThrow(new Error());
  });
  it("should calls ComparationEncrypter with correct passwords if findByEmail returns an account", async () => {
    const { sut, accountsRepositorySpy, comparationEncrypterSpy } = makeSut();
    const params = makeAuthenticateParams();
    await sut.auth(params);
    expect(comparationEncrypterSpy.params).toEqual({
      value: params.password,
      valueToCompare: accountsRepositorySpy.account.password,
    });
  });
  it("should return falsy if ComparationEncrypter returns false", async () => {
    const { sut, comparationEncrypterSpy } = makeSut();
    jest
      .spyOn(comparationEncrypterSpy, "compare")
      .mockImplementationOnce(() => Promise.resolve(false));
    const result = await sut.auth(makeAuthenticateParams());
    expect(result).toBeFalsy();
  });
  it("should calls GenerateAccessToken with correct params if password matches", async () => {
    const { sut, accountsRepositorySpy, generateAccessTokenSpy } = makeSut();
    await sut.auth(makeAuthenticateParams());
    expect(generateAccessTokenSpy.params).toEqual({
      id: accountsRepositorySpy.account.id,
      email: accountsRepositorySpy.account.email,
    });
  });
  it("should returns the account on success", async () => {
    const { sut, accountsRepositorySpy, generateAccessTokenSpy } = makeSut();
    const result = await sut.auth(makeAuthenticateParams());
    expect(result).toEqual({
      accessToken: generateAccessTokenSpy.accessToken,
      account: {
        id: accountsRepositorySpy.account.id,
        name: accountsRepositorySpy.account.name,
      },
    });
  });
});
