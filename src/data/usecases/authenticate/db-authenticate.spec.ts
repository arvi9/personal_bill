import faker from "faker";
import { AccountsRepositorySpy } from "@/data/tests";
import { DbAuthenticate } from "./db-authenticate";

describe("DbAuthenticate", () => {
  it("should calls AccountsRepository.findByEmail with correct values", async () => {
    const accountsRepositorySpy = new AccountsRepositorySpy();
    const sut = new DbAuthenticate(accountsRepositorySpy);
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await sut.auth(params);
    expect(accountsRepositorySpy.email).toEqual(params.email);
  });
});
