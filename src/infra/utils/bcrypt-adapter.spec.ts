import faker from "faker";
import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt");
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe("BcryptAdapter", () => {
  it("should calls bcrypt with correct values", () => {
    const sut = new BcryptAdapter();
    const params = {
      value: faker.random.word(),
      valueToCompare: faker.random.word(),
    };
    sut.compare(params);
    expect(mockedBcrypt.compare).toHaveBeenCalledWith(
      params.value,
      params.valueToCompare
    );
  });
});
