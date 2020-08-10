import faker from "faker";
import { getConnection, getRepository } from "typeorm";
import connection from "@/infra/db/config/database";
import { TypeOrmMonthlyExpensesRepository } from "./typeorm-monthly-expenses-repository";
import { insertOneAccount } from "@/infra/db/seeds";
import { AccountModel, MonthlyExpensesModel } from "@/infra/db/models";
import { mockAccount, mockMonthlyExpense } from "@/domain/tests";
import { MonthlyExpense } from "@/domain/models";
import { UpdateMonthlyExpenses } from "@/domain/usecases";
import { MonthlyExpensesRepository } from "@/data/protocols";
import { getMonth, getYear } from "date-fns";

const makeSut = (): TypeOrmMonthlyExpensesRepository =>
  new TypeOrmMonthlyExpensesRepository();

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
      const sut = makeSut();
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
    it("should returns the monthly expenses between two dates", async () => {
      const sut = makeSut();
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
        finalDate: new Date(2020, 8, 20),
      });
      expect(result).toHaveLength(2);
      expect(result[0].month).toBe(8);
      expect(result[0].year).toBe(2020);
      expect(result[0].value).toBe(monthlyOne.value);
      expect(result[1].month).toBe(9);
      expect(result[1].year).toBe(2020);
      expect(result[1].value).toBe(monthlyTwo.value);
    });
  });
  describe("add", () => {
    it("should add a new monthly expense", async () => {
      const sut = makeSut();
      const account = mockAccount();
      await insertOneAccount(getRepository(AccountModel), account);

      const monthlyExpenseRepository = getRepository(MonthlyExpensesModel);
      const expense: MonthlyExpensesRepository.Params = {
        account,
        date: faker.date.recent(),
        value: 500,
      };
      await sut.add(expense);
      const expenses = await monthlyExpenseRepository.find();
      expect(expenses).toHaveLength(1);
      expect(expenses[0].month).toBe(getMonth(expense.date) + 1);
      expect(expenses[0].year).toBe(getYear(expense.date));
      expect(expenses[0].value).toBe(`${expense.value}.00`);
    });
  });
});
