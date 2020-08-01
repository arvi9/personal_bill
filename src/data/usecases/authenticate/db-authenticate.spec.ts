import faker from "faker";
import {
  AccountsRepositorySpy,
  ComparationEncrypterSpy,
  GenerateAccessTokenSpy,
} from "@/data/tests";
import { DbAuthenticate } from "./db-authenticate";
import { Authenticate } from "@/domain/usecases";
import { UpdateAccessTokenRepositoryMock } from "@/data/tests/db/mock-update-token-repository";

type SutTypes = {
  sut: DbAuthenticate;
  accountsRepositorySpy: AccountsRepositorySpy;
  comparationEncrypterSpy: ComparationEncrypterSpy;
  generateAccessTokenSpy: GenerateAccessTokenSpy;
  updateAccessTokenRepositoryMock: UpdateAccessTokenRepositoryMock;
};

const makeSut = (): SutTypes => {
  const accountsRepositorySpy = new AccountsRepositorySpy();
  const comparationEncrypterSpy = new ComparationEncrypterSpy();
  const generateAccessTokenSpy = new GenerateAccessTokenSpy();
  const updateAccessTokenRepositoryMock = new UpdateAccessTokenRepositoryMock();
  const sut = new DbAuthenticate(
    accountsRepositorySpy,
    comparationEncrypterSpy,
    generateAccessTokenSpy,
    updateAccessTokenRepositoryMock
  );
  return {
    sut,
    accountsRepositorySpy,
    comparationEncrypterSpy,
    generateAccessTokenSpy,
    updateAccessTokenRepositoryMock,
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
  it("should calls ComparationEncrypter with correct password if repository returns an account", async () => {
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
  it("should calls UpdateAccessTokenRepository with correct values", async () => {
    const {
      sut,
      accountsRepositorySpy,
      generateAccessTokenSpy,
      updateAccessTokenRepositoryMock,
    } = makeSut();
    await sut.auth(makeAuthenticateParams());
    expect(updateAccessTokenRepositoryMock.params).toEqual({
      accountId: accountsRepositorySpy.account.id,
      accessToken: generateAccessTokenSpy.accessToken,
    });
  });
  it("should throws if UpdateAccessTokenRepository throws", () => {
    const { sut, updateAccessTokenRepositoryMock } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryMock, "update")
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const result = sut.auth(makeAuthenticateParams());
    expect(result).rejects.toThrow(new Error());
  });
});
