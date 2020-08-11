import faker from "faker";
import { DbSignUp } from "./db-sign-up";
import { AccountsRepositorySpy } from "@/data/tests";

describe("DbSignUp", () => {
  it("should calls LoadAccountByEmail repository with correct email", async () => {
    const loadAccountByEmailSpy = new AccountsRepositorySpy();
    const sut = new DbSignUp(loadAccountByEmailSpy);
    const params = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      passwordConfirmation: this.password,
    };
    await sut.signup(params);
    expect(loadAccountByEmailSpy.email).toBe(params.email);
  });
});
