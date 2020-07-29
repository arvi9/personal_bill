import faker from "faker";
import { getRepository, Repository } from "typeorm";
import { TypeOrmAccountsRepository } from "./typeorm-accounts-repository";
import { AccountModel } from "../../models/account";
import { mockAccount } from "@/domain/tests/mock-account";
import connection from "@/infra/db/config/database";

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
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });
  describe("findByEmail", () => {
    it("should returns the correct account by a given email", async () => {
      const { sut, helperRepository } = makeSut();
      const account = mockAccount();
      const created = helperRepository.create(account);
      await helperRepository.save(created);
      const response = await sut.findByEmail(account.email);
      expect(response).toEqual(account);
    });
    it("should returns falsy if the account is not found", async () => {
      const { sut, helperRepository } = makeSut();
      const created = helperRepository.create({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      await helperRepository.save(created);
      const response = await sut.findByEmail(faker.internet.email());
      expect(response).toBeFalsy();
    });
    it("should throws if typeorm throws", () => {
      const { sut, helperRepository } = makeSut();
      jest.spyOn(helperRepository, "findOne").mockImplementationOnce(() => {
        throw new Error();
      });
      const result = sut.findByEmail(faker.internet.email());
      expect(result).rejects.toThrow(new Error());
    });
  });
});
