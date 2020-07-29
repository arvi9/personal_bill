import "reflect-metadata";
import { getRepository } from "typeorm";
import { TypeOrmAccountsRepository } from "./typeorm-accounts-repository";
import { AccountModel } from "../../models/account";
import { mockAccount } from "@/domain/tests/mock-account";
import connection from "@/infra/db/config/database";

describe("TypeOrmAccountsRepository", () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });
  describe("findByEmail", () => {
    it("should returns the correct account by a given email", async () => {
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
