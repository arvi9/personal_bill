import faker from "faker";
import { AccountsRepositorySpy } from "@/data/tests";
import { DbAuthenticate } from "./db-authenticate";

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

describe("DbAuthenticate", () => {
  it("should calls AccountsRepository.findByEmail with correct values", async () => {
    const { sut, accountsRepositorySpy } = makeSut();
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.auth(params);
    expect(accountsRepositorySpy.email).toEqual(params.email);
  });
});
