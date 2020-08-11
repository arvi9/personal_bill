import faker from "faker";
import { DbSignUp } from "./db-sign-up";
import { AccountsRepositorySpy } from "@/data/tests";

type SutTypes = {
  sut: DbSignUp;
  loadAccountByEmailSpy: AccountsRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new AccountsRepositorySpy();
  const sut = new DbSignUp(loadAccountByEmailSpy);
  return {
    sut,
    loadAccountByEmailSpy,
  };
};

const makeFakeParams = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: this.password,
});

describe("DbSignUp", () => {
  it("should calls LoadAccountByEmail repository with correct email", async () => {
    const { sut, loadAccountByEmailSpy } = makeSut();
    const params = makeFakeParams();
    await sut.signup(params);
    expect(loadAccountByEmailSpy.email).toBe(params.email);
  });
});
