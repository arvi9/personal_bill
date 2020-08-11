import faker from "faker";
import { DbSignUp } from "./db-sign-up";
import { AccountsRepositorySpy, HashSpy } from "@/data/tests";

type SutTypes = {
  sut: DbSignUp;
  loadAccountByEmailSpy: AccountsRepositorySpy;
  hasherSpy: HashSpy;
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailSpy = new AccountsRepositorySpy();
  const hasherSpy = new HashSpy();
  const sut = new DbSignUp(loadAccountByEmailSpy, hasherSpy);
  return {
    sut,
    loadAccountByEmailSpy,
    hasherSpy,
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
});
