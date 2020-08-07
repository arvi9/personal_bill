import { getConnection, getRepository } from "typeorm";
import connection from "@/infra/db/config/database";
import { TypeOrmMonthlyExpensesRepository } from "./typeorm-monthly-expenses-repository";
import { insertOneAccount } from "../../seeds";
import { AccountModel } from "../../models";
import { mockAccount } from "@/domain/tests";

describe("TypeOrmMonthlyExpensesRepository", () => {
  beforeAll(async () => {
    await connection.create();
    await getConnection().runMigrations();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await getConnection().undoLastMigration();
    await connection.close();
  });
  describe("loadByDate", () => {
    it("should returns the monthly expenses for a given date", async () => {
      const sut = new TypeOrmMonthlyExpensesRepository();
      const account = mockAccount();
      await insertOneAccount(getRepository(AccountModel), account);
      await sut.loadByDate({
        account: {
          id: account.id,
        },
        date: new Date(2020, 7, 20),
      });
    });
  });
});
