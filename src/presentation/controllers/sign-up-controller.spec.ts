import faker from "faker";
import { SignUpController } from "./sign-up-controller";
import { ValidationSpy } from "@/presentation/test";

describe("SignUpController", () => {
  it("should calls validation with correct params", async () => {
    const validationSpy = new ValidationSpy();
    const sut = new SignUpController(validationSpy);
    const password = faker.internet.password();
    const params = {
      body: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password,
        passwordConfirmation: password,
      },
    };
    await sut.handle(params);
    expect(validationSpy.input).toEqual(params.body);
  });
});
