import faker from "faker";
import { DbSignUp } from "./db-sign-up";
import {
  AccountsRepositorySpy,
  HashSpy,
  GenerateAccessTokenSpy,
} from "@/data/tests";

type SutTypes = {
  sut: DbSignUp;
  loadAccountByEmailSpy: AccountsRepositorySpy;
  addAccountRepositorySpy: AccountsRepositorySpy;
  hasherSpy: HashSpy;
  generateAccessTokenSpy: GenerateAccessTokenSpy;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new AccountsRepositorySpy();
  const hasherSpy = new HashSpy();
  const addAccountRepositorySpy = new AccountsRepositorySpy();
  const generateAccessTokenSpy = new GenerateAccessTokenSpy();
  const sut = new DbSignUp(
    loadAccountByEmailSpy,
    hasherSpy,
    addAccountRepositorySpy,
    generateAccessTokenSpy
  );
  return {
    sut,
    loadAccountByEmailSpy,
    hasherSpy,
    addAccountRepositorySpy,
    generateAccessTokenSpy,
  };
};

const makeFakeParams = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("DbSignUp", () => {
  it("should calls LoadAccountByEmail repository with correct email", async () => {
    const { sut, loadAccountByEmailSpy } = makeSut();
    const params = makeFakeParams();
    await sut.signup(params);
    expect(loadAccountByEmailSpy.email).toBe(params.email);
  });
  it("should return null if LoadAccountByEmail returns an account", async () => {
    const { sut } = makeSut();
    const result = await sut.signup(makeFakeParams());
    expect(result).toBeNull();
  });
  it("should calls Hasher with correct password", async () => {
    const { sut, hasherSpy } = makeSut();
    const params = makeFakeParams();
    await sut.signup(params);
    expect(hasherSpy.text).toBe(params.password);
  });
  it("should throws if LoadAccountByEmail throws", () => {
    const { sut, loadAccountByEmailSpy } = makeSut();
    jest
      .spyOn(loadAccountByEmailSpy, "loadByEmail")
      .mockRejectedValueOnce(new Error());
    const result = sut.signup(makeFakeParams());
    expect(result).rejects.toEqual(new Error());
  });
  it("should throws if Hasher throws", () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, "hash").mockRejectedValueOnce(new Error());
    const result = sut.signup(makeFakeParams());
    expect(result).rejects.toEqual(new Error());
  });
  it("should calls AddAccountRepository with correct params", async () => {
    const { sut, hasherSpy, addAccountRepositorySpy } = makeSut();
    const params = makeFakeParams();
    await sut.signup(params);
    expect(addAccountRepositorySpy.addParams).toEqual({
      ...params,
      password: hasherSpy.hashedValue,
    });
  });
  it("should throws if AddAccountRepository throws", () => {
    const { sut, addAccountRepositorySpy } = makeSut();
    jest
      .spyOn(addAccountRepositorySpy, "add")
      .mockRejectedValueOnce(new Error());
    const result = sut.signup(makeFakeParams());
    expect(result).rejects.toEqual(new Error());
  });
  it("should calls GenerateAccessToken with correct params", async () => {
    const { sut, addAccountRepositorySpy, generateAccessTokenSpy } = makeSut();
    await sut.signup(makeFakeParams());
    expect(generateAccessTokenSpy.params).toEqual({
      id: addAccountRepositorySpy.account.id,
      email: addAccountRepositorySpy.account.email,
    });
  });
});
