import faker from "faker";
import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt");
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

const makeSut = (): BcryptAdapter => new BcryptAdapter();

describe("BcryptAdapter", () => {
  it("should calls bcrypt with correct values", async () => {
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
});
