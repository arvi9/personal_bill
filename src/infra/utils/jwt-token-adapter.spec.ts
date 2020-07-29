import jwt from "jsonwebtoken";
import faker from "faker";
import { JwtTokenAdapter } from "./jwt-token-adapter";

jest.mock("jsonwebtoken");
const mockedJwt = jwt as jest.Mocked<typeof jwt>;

const makeSut = (secretKey = faker.random.uuid()): JwtTokenAdapter =>
  new JwtTokenAdapter(secretKey);

const makeParams = () => ({
  email: faker.internet.email(),
  id: faker.random.uuid(),
});

describe("JwtTokenAdapter", () => {
  it("should calls jsonwebtoken with correct values", () => {
    const secretKey = faker.random.uuid();
    const sut = makeSut(secretKey);
    const params = makeParams();
    sut.generate(params);
    expect(mockedJwt.sign).toHaveBeenCalledWith(params, secretKey);
  });
  it("should returns the generated token on success", () => {
    const token = faker.random.uuid();
    mockedJwt.sign.mockImplementationOnce(() => token);
    const sut = makeSut();
    const result = sut.generate(makeParams());
    expect(result).toBe(token);
  });
});
