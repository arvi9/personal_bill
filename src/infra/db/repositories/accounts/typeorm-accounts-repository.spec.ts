import "reflect-metadata";
import {
  createConnection,
  getConnection,
  Connection,
  getRepository,
} from "typeorm";
import { TypeOrmAccountsRepository } from "./typeorm-accounts-repository";
import { AccountModel } from "../../models/account";
import { mockAccount } from "@/domain/tests/mock-account";

describe("TypeOrmAccountsRepository", () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
  });
  afterAll(async () => {
    await getConnection().close();
  });
  describe("findByEmail", () => {
    it("should returns the correct user by a given email", async () => {
      const account = mockAccount();
      const repository = getRepository(AccountModel);
      const created = repository.create(account);
      await repository.save(created);

      const sut = new TypeOrmAccountsRepository();
      const response = await sut.findByEmail(account.email);
      expect(response).toEqual(account);
    });
  });
});
