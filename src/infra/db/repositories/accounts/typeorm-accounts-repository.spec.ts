import faker from "faker";
import { getRepository, Repository, getConnection } from "typeorm";
import { TypeOrmAccountsRepository } from "./typeorm-accounts-repository";
import { AccountModel } from "@/infra/db/models";
import { mockAccount } from "@/domain/tests/mock-account";
import connection from "@/infra/db/config/database";
import { insertOneAccount } from "../../seeds";

type SutTypes = {
  sut: TypeOrmAccountsRepository;
  helperRepository: Repository<AccountModel>;
};

const makeSut = (): SutTypes => {
  const helperRepository = getRepository(AccountModel);
  const sut = new TypeOrmAccountsRepository();
  return { sut, helperRepository };
};

describe("TypeOrmAccountsRepository", () => {
  beforeAll(async () => {
    await connection.create();
    await getConnection().runMigrations();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
    await getConnection().undoLastMigration();
  });
  describe("loadByEmail", () => {
    it("should returns the correct account by a given email", async () => {
      const { sut, helperRepository } = makeSut();
      const account = mockAccount();
      const created = helperRepository.create(account);
      await helperRepository.save(created);
      const response = await sut.loadByEmail(account.email);
      expect(response).toEqual(account);
    });
    it("should returns falsy if the account is not found", async () => {
      const { sut, helperRepository } = makeSut();
      const created = helperRepository.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        accessToken: faker.random.uuid(),
      });
      await helperRepository.save(created);
      const response = await sut.loadByEmail(faker.internet.email());
      expect(response).toBeFalsy();
    });
    it("should throws if typeorm throws", () => {
      const { sut, helperRepository } = makeSut();
      jest.spyOn(helperRepository, "findOne").mockImplementationOnce(() => {
        throw new Error();
      });
      const result = sut.loadByEmail(faker.internet.email());
      expect(result).rejects.toThrow(new Error());
    });
  });
  describe("updateAccessToken", () => {
    it("should update the account access token", async () => {
      const { sut, helperRepository } = makeSut();
      const account = mockAccount();
      const createdAccount = await insertOneAccount(helperRepository, {
        ...account,
        accessToken: faker.random.uuid(),
      });
      const accessToken = faker.random.uuid();
      await sut.updateAccessToken({
        accountId: createdAccount.id,
        accessToken,
      });
      const updatedAccount = await helperRepository.findOne(createdAccount.id);
      expect(updatedAccount.accessToken).toBe(accessToken);
    });
  });
});
