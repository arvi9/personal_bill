import faker from "faker";
import bcrypt from "bcrypt";
import request from "supertest";
import jsonwebtoken from "jsonwebtoken";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";
import { getRepository, Repository } from "typeorm";
import { AccountModel } from "@/infra/db/models/account";
import { insertOneAccount } from "@/infra/db/seeds";

jest.mock("jsonwebtoken");
const mockedJwt = jsonwebtoken as jest.Mocked<typeof jsonwebtoken>;

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
  it("should returns bad request if email and password was not provided", async (done) => {
    request(app)
      .post("/login")
      .send({
        [faker.database.column()]: faker.random.word(),
      })
      .expect(400, done);
  });
  it("should returns 200 with access token and account on success", async (done) => {
    const email = faker.internet.email();
    const password = bcrypt.hashSync("password", 12);
    const account = {
      id: faker.random.uuid(),
      email,
      password,
      name: faker.name.findName(),
    };
    const token = faker.random.uuid();
    mockedJwt.sign.mockImplementationOnce(() => token);
    await insertOneAccount(repository, account);
    request(app)
      .post("/login")
      .send({
        email,
        password: "password",
      })
      .expect(
        200,
        {
          accessToken: token,
          account: {
            id: account.id,
            name: account.name,
          },
        },
        done
      );
  });
});
