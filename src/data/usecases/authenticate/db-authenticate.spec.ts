import faker from "faker";
import { AccountsRepositorySpy } from "@/data/tests";
import { DbAuthenticate } from "./db-authenticate";
import { Authenticate } from "@/domain/usecases";
import { AccountNotFoundError } from "@/domain/errors";

type SutTypes = {
  sut: DbAuthenticate;
  accountsRepositorySpy: AccountsRepositorySpy;
};

const makeSut = (): SutTypes => {
  const accountsRepositorySpy = new AccountsRepositorySpy();
  const sut = new DbAuthenticate(accountsRepositorySpy);
  return {
    sut,
    accountsRepositorySpy,
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
});
