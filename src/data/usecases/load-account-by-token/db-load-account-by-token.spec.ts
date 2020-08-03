import faker from "faker";
import { DbLoadAccountByToken } from "@/data/usecases";
import { DecrypterSpy } from "@/data/tests";

describe("DbLoadAccountByToken", () => {
  it("should calls Decrypter with correct values", async () => {
    const token = faker.random.uuid();
    const decrypterSpy = new DecrypterSpy();
    const sut = new DbLoadAccountByToken(decrypterSpy);
    await sut.load(token);
    expect(decrypterSpy.value).toBe(token);
  });
});
