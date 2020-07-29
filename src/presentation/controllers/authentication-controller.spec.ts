import faker from "faker";
import { AuthenticationController } from "./authentication-controller";
import { badRequest } from "../protocols/http";

describe("AuthenticationController", () => {
  it("should returns badRequest if email was not provided", async () => {
    const sut = new AuthenticationController();
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
});
