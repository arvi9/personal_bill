import request from "supertest";
import faker from "faker";
import { getConnection, getRepository } from "typeorm";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { mockAccount } from "@/domain/tests";
import { insertOneAccount } from "@/infra/db/seeds";
import { AccountModel } from "@/infra/db/models";

describe("SignUp Route", () => {
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
  it("should returns 400 if email address is already in use", async () => {
    const dbAccount = {
      ...mockAccount(),
      email: faker.internet.email(),
    };
    await insertOneAccount(getRepository(AccountModel), dbAccount);
    const { accessToken, id, ...fakeAccount } = mockAccount();
    const accountRequest = {
      ...fakeAccount,
      email: dbAccount.email,
      passwordConfirmation: fakeAccount.password,
    };
    await request(app).post("/signup").send(accountRequest).expect(400);
  });
  it("should returns 400 if email is invalid", async () => {
    const accountRequest = mockAccount();
    accountRequest.email = "any invalid email";
    await request(app).post("/signup").send(accountRequest).expect(400);
  });
});
