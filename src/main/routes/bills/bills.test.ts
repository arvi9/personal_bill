import request from "supertest";
import { getConnection, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { mockAccount, mockBill } from "@/domain/tests";
import { insertOneAccount } from "@/infra/db/seeds";
import { AccountModel, MonthlyExpensesModel } from "@/infra/db/models";

describe("Bills Routes", () => {
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
  describe("POST /bills", () => {
    it("should returns 403 without access token", async () => {
      const addBill = mockBill();
      const account = mockAccount();
      addBill.account = account;
      await insertOneAccount(getRepository(AccountModel), account);
      await request(app).post("/bills").send(addBill).expect(403);
    });
    it("should returns 201 on success", async () => {
      const account = mockAccount();
      const accessToken = jwt.sign(
        { id: account.id, email: account.email },
        process.env.JWT_SECRET_KEY
      );
      account.accessToken = accessToken;
      const addBill = mockBill();
      addBill.amount = 1;
      addBill.account = account;
      await insertOneAccount(getRepository(AccountModel), account);
      await request(app)
        .post("/bills")
        .set("x-access-token", accessToken)
        .send(addBill)
        .expect(201);

      const monthlyExpenses = await getRepository(MonthlyExpensesModel).find();
      expect(monthlyExpenses).toHaveLength(1);
      expect(monthlyExpenses[0].value).toBe(`${addBill.value}.00`);
    });
  });
});
