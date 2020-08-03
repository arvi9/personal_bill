import faker from "faker";
import { DbLoadAccountByToken } from "@/data/usecases";
import { DecrypterSpy, AccountsRepositorySpy } from "@/data/tests";

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterSpy: DecrypterSpy;
  loadAccountByTokenRepositorySpy: AccountsRepositorySpy;
};

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const loadAccountByTokenRepositorySpy = new AccountsRepositorySpy();
  const sut = new DbLoadAccountByToken(
    decrypterSpy,
    loadAccountByTokenRepositorySpy
  );
  return { sut, decrypterSpy, loadAccountByTokenRepositorySpy };
};

describe("DbLoadAccountByToken", () => {
  it("should calls Decrypter with correct value", async () => {
    const token = faker.random.uuid();
    const { sut, decrypterSpy } = makeSut();
    await sut.load(token);
    expect(decrypterSpy.value).toBe(token);
  });
  it("should returns null if Decrypter returns null", async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.returnValue = null;
    const result = await sut.load(faker.random.uuid());
    expect(result).toBeNull();
  });
  it("should calls LoadAccountByTokenRepository with correct values", async () => {
    const token = faker.random.uuid();
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    await sut.load(token);
    expect(loadAccountByTokenRepositorySpy.accessToken).toEqual(token);
  });
  it("should returns null if LoadAccountByTokenRepository returns null", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    loadAccountByTokenRepositorySpy.account = null;
    const result = await sut.load(faker.random.uuid());
    expect(result).toBeNull();
  });
  it("should return an account on success", async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    const result = await sut.load(faker.random.uuid());
    expect(result).toEqual(loadAccountByTokenRepositorySpy.account);
  });
  it("should throws if Decrypter throws", () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, "decrypt").mockRejectedValueOnce(new Error());
    const result = sut.load(faker.random.uuid());
    expect(result).rejects.toThrow(new Error());
  });
  it("should throws if LoadAccountByTokenRepository throws", () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositorySpy, "loadByToken")
      .mockRejectedValueOnce(new Error());
    const result = sut.load(faker.random.uuid());
    expect(result).rejects.toThrow(new Error());
  });
});
