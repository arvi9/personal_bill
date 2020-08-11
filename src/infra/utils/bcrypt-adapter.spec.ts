import faker from "faker";
import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt");
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

const makeSut = (): BcryptAdapter => {
  const salts = 12;
  return new BcryptAdapter(salts);
};

describe("BcryptAdapter", () => {
  describe("compare", () => {
    it("should calls bcrypt.compare with correct values", async () => {
      const sut = makeSut();
      const params = {
        value: faker.random.word(),
        valueToCompare: faker.random.word(),
      };
      await sut.compare(params);
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        params.value,
        params.valueToCompare
      );
    });
    it("should returns false if comparation fails", async () => {
      const sut = makeSut();
      mockedBcrypt.compare.mockResolvedValueOnce(false);
      const params = {
        value: faker.random.word(),
        valueToCompare: faker.random.word(),
      };
      const result = await sut.compare(params);
      expect(result).toBe(false);
    });
    it("should returns true if comparation succeds", async () => {
      const sut = makeSut();
      mockedBcrypt.compare.mockResolvedValueOnce(true);
      const value = faker.random.word();
      const params = {
        value,
        valueToCompare: value,
      };
      const result = await sut.compare(params);
      expect(result).toBe(true);
    });
  });
  describe("hash", () => {
    it("should calls bcrypt.hash with correct values", async () => {
      const sut = makeSut();
      const param = "any string value";
      await sut.hash(param);
      expect(mockedBcrypt.hash).toHaveBeenCalledWith(param, 12);
    });
  });
});
