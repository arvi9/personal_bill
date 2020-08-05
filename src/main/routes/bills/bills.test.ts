import request from "supertest";
import { getConnection, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { mockAccount, mockBill } from "@/domain/tests";
import { insertOneAccount } from "@/infra/db/seeds";
import { AccountModel } from "@/infra/db/models";

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
  });
});
