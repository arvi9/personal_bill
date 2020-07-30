import faker from "faker";
import request from "supertest";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { getRepository, Repository } from "typeorm";
import { AccountModel } from "@/infra/db/models/account";
import { mockAccount } from "@/domain/tests/mock-account";
import { insertOneAccount } from "@/infra/db/seeds";

describe("Authentication Route", () => {
  let repository: Repository<AccountModel>;
  beforeAll(async () => {
    await connection.create();
    repository = getRepository(AccountModel);
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });
  it("should returns unauthorized if user was not found", (done) => {
    request(app)
      .post("/login")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .expect(401, done);
  });
  it("should returns unauthorized if email and password does not match", async (done) => {
    await insertOneAccount(repository);
    request(app)
      .post("/login")
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
      })
      .expect(401, done);
  });
  it("should returns unauthorized if password does not match", async (done) => {
    const email = faker.internet.email();
    await insertOneAccount(repository, {
      id: faker.random.uuid(),
      email,
      password: faker.internet.password(),
      name: faker.name.findName(),
    });
    request(app)
      .post("/login")
      .send({
        email,
        password: faker.internet.password(),
      })
      .expect(401, done);
  });
});
