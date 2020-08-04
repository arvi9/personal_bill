import request from "supertest";
import { getConnection, getRepository } from "typeorm";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { mockAddExpense, mockAccount } from "@/domain/tests";
import { insertOneAccount } from "@/infra/db/seeds";
import { AccountModel } from "@/infra/db/models";

describe("Expenses Routes", () => {
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
  describe("POST /expenses", () => {
    it("should returns 403 without access token", async () => {
      const addExpense = mockAddExpense();
      const account = mockAccount();
      addExpense.account = account;
      await insertOneAccount(getRepository(AccountModel), account);
      await request(app).post("/expenses").send(addExpense).expect(403);
    });
  });
});
