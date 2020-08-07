import { getConnection, getRepository } from "typeorm";
import connection from "@/infra/db/config/database";
import { TypeOrmMonthlyExpensesRepository } from "./typeorm-monthly-expenses-repository";
import { insertOneAccount } from "../../seeds";
import { AccountModel, MonthlyExpensesModel } from "../../models";
import { mockAccount, mockMonthlyExpense } from "@/domain/tests";

describe("TypeOrmMonthlyExpensesRepository", () => {
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
  describe("loadByDate", () => {
    it("should returns the monthly expenses for a given date", async () => {
      const sut = new TypeOrmMonthlyExpensesRepository();
      const account = mockAccount();
      await insertOneAccount(getRepository(AccountModel), account);

      const monthlyExpenseRepository = getRepository(MonthlyExpensesModel);
      const monthlyOne = mockMonthlyExpense();
      const monthlyTwo = mockMonthlyExpense();
      monthlyOne.account = account;
      monthlyOne.month = 8;
      monthlyOne.year = 2020;
      delete monthlyOne.id;
      monthlyTwo.account = account;
      monthlyTwo.month = 9;
      monthlyTwo.year = 2020;
      delete monthlyTwo.id;
      const createdModels = monthlyExpenseRepository.create([
        monthlyOne,
        monthlyTwo,
      ]);
      await monthlyExpenseRepository.save(createdModels);

      const result = await sut.loadByDate({
        account: {
          id: account.id,
        },
        date: new Date(2020, 7, 20),
      });
      expect(result).toHaveLength(1);
      expect(result[0].month).toBe(8);
      expect(result[0].year).toBe(2020);
      expect(result[0].value).toBe(monthlyOne.value);
    });
  });
});
