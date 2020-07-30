import faker from "faker";
import request from "supertest";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";

describe("Authentication Route", () => {
  beforeAll(async () => {
    await connection.create();
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
});
