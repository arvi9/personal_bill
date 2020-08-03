import faker from "faker";
import { DbLoadAccountByToken } from "@/data/usecases";
import { DecrypterSpy } from "@/data/tests";

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterSpy: DecrypterSpy;
};

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const sut = new DbLoadAccountByToken(decrypterSpy);
  return { sut, decrypterSpy };
};

describe("DbLoadAccountByToken", () => {
  it("should calls Decrypter with correct value", async () => {
    const token = faker.random.uuid();
    const { sut, decrypterSpy } = makeSut();
    await sut.load(token);
    expect(decrypterSpy.value).toBe(token);
  });
});
