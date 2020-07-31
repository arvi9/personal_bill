import { TypeOrmAddExpenseRepository } from "./typeorm-add-expense-repository";
import { mockAddExpense, mockAccount } from "@/domain/tests";
import { getRepository } from "typeorm";
import { ExpenseModel, AccountModel } from "@/infra/db/models";
import connection from "@/infra/db/config/database";
import { insertOneAccount } from "../../seeds";

const makeSut = (): TypeOrmAddExpenseRepository =>
  new TypeOrmAddExpenseRepository();

describe("TypeOrmAddExpenseRepository", () => {
  beforeAll(async () => {
    await connection.create();
  });
  beforeEach(async () => {
    await connection.clear();
  });
  afterAll(async () => {
    await connection.close();
  });
  it.only("should add a new expense to the database", async () => {
    const repository = getRepository(ExpenseModel);
    const accountRepository = getRepository(AccountModel);
    const account = mockAccount();
    await insertOneAccount(accountRepository, account);
    const sut = makeSut();
    await sut.add({ ...mockAddExpense(), account });
    const expenses = await repository.find();
    expect(expenses).toHaveLength(1);
  });
});
