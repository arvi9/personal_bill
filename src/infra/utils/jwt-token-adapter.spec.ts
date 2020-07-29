import jwt from "jsonwebtoken";
import faker from "faker";
import { JwtTokenAdapter } from "./jwt-token-adapter";

jest.mock("jsonwebtoken");
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe("JwtTokenAdapter", () => {
  it("should calls jsonwebtoken with correct values", () => {
    const secretKey = faker.random.uuid();
    const sut = new JwtTokenAdapter(secretKey);
    const params = {
      email: faker.internet.email(),
      id: faker.random.uuid(),
    };
    sut.generate(params);
    expect(mockedJwt.sign).toHaveBeenCalledWith(params, secretKey);
  });
});
