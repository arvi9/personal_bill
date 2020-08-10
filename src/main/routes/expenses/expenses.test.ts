import request from "supertest";
import { getConnection, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { mockAddExpense, mockAccount } from "@/domain/tests";
import { insertOneAccount } from "@/infra/db/seeds";
import { AccountModel, MonthlyExpensesModel } from "@/infra/db/models";

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
    it("should returns 201 with valid access token", async () => {
      const account = mockAccount();
      const accessToken = jwt.sign(
        { id: account.id, email: account.email },
        process.env.JWT_SECRET_KEY
      );
      account.accessToken = accessToken;
      const addExpense = mockAddExpense();
      addExpense.account = account;
      await insertOneAccount(getRepository(AccountModel), account);
      await request(app)
        .post("/expenses")
        .set("x-access-token", account.accessToken)
        .send({ ...addExpense, date: "2020-08-10" })
        .expect(201);
      const monthlyExpenses = await getRepository(MonthlyExpensesModel).find();
      expect(monthlyExpenses).toHaveLength(1);
      expect(monthlyExpenses[0].value).toBe(`${addExpense.value}.00`);
    });
  });
});
