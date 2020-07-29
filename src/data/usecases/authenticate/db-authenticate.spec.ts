import faker from "faker";
import { AccountsRepositorySpy, ComparationEncrypterSpy } from "@/data/tests";
import { DbAuthenticate } from "./db-authenticate";
import { Authenticate } from "@/domain/usecases";
import { AccountNotFoundError, IncorrectPasswordError } from "@/domain/errors";

type SutTypes = {
  sut: DbAuthenticate;
  accountsRepositorySpy: AccountsRepositorySpy;
  comparationEncrypterSpy: ComparationEncrypterSpy;
};

const makeSut = (): SutTypes => {
  const accountsRepositorySpy = new AccountsRepositorySpy();
  const comparationEncrypterSpy = new ComparationEncrypterSpy();
  const sut = new DbAuthenticate(
    accountsRepositorySpy,
    comparationEncrypterSpy
  );
  return {
    sut,
    accountsRepositorySpy,
    comparationEncrypterSpy,
  };
};

const makeAuthenticateParams = (): Authenticate.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe("DbAuthenticate", () => {
  it("should calls AccountsRepository.findByEmail with correct values", async () => {
    const { sut, accountsRepositorySpy } = makeSut();
    const params = makeAuthenticateParams();
    await sut.auth(params);
    expect(accountsRepositorySpy.email).toEqual(params.email);
  });
  it("should throws AccountNotFoundError if findByEmail returns null", () => {
    const { sut, accountsRepositorySpy } = makeSut();
    accountsRepositorySpy.account = null;
    const result = sut.auth(makeAuthenticateParams());
    expect(result).rejects.toThrow(new AccountNotFoundError());
  });
  it("should calls ComparationEncrypter with correct passwords if findByEmail returns an account", async () => {
    const { sut, accountsRepositorySpy, comparationEncrypterSpy } = makeSut();
    const params = makeAuthenticateParams();
    await sut.auth(params);
    expect(comparationEncrypterSpy.params).toEqual({
      value: accountsRepositorySpy.account.password,
      valueToCompare: params.password,
    });
  });
  it("should throws IncorrectPasswordError with ComparationEncrypter returns false", () => {
    const { sut, comparationEncrypterSpy } = makeSut();
    jest.spyOn(comparationEncrypterSpy, "compare").mockReturnValueOnce(false);
    const result = sut.auth(makeAuthenticateParams());
    expect(result).rejects.toThrow(new IncorrectPasswordError());
  });
});
