import faker from "faker";
import { AuthenticationController } from "./authentication-controller";
import { badRequest } from "../protocols/http";
import { Authenticate } from "@/domain/usecases";

type SutTypes = {
  sut: AuthenticationController;
  authenticateSpy: AuthenticateSpy;
};

const makeSut = (): SutTypes => {
  const authenticateSpy = new AuthenticateSpy();
  const sut = new AuthenticationController(authenticateSpy);
  return { sut, authenticateSpy };
};

class AuthenticateSpy implements Authenticate {
  params: any;
  auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    this.params = params;
    return null;
  }
}

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
  it("should calls Authenticate use case with correct email and password", async () => {
    const { sut, authenticateSpy } = makeSut();
    const httpRequest = {
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    };
    await sut.handle(httpRequest);
    expect(authenticateSpy.params).toEqual(httpRequest.body);
  });
});
