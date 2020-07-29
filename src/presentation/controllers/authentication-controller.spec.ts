import faker from "faker";
import { AuthenticationController } from "./authentication-controller";
import { badRequest } from "../protocols/http";

type SutTypes = {
  sut: AuthenticationController;
};

const makeSut = (): SutTypes => {
  const sut = new AuthenticationController();
  return { sut };
};

describe("AuthenticationController", () => {
  it("should returns badRequest if password was not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { email: faker.internet.email() },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest({
        message: "Password is required",
      })
    );
  });
  it("should returns badRequest if email was not provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: { password: faker.internet.password() },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest({
        message: "Email is required",
      })
    );
  });
});
