import faker from "faker";
import { MonthlyExpense } from "@/domain/models";
import { mockAccount } from "./mock-account";

export const mockMonthlyExpense = (): MonthlyExpense => ({
  value: faker.random.number(),
  year: faker.random.number(2020),
  month: faker.random.number(31),
  account: mockAccount(),
});

export const mockMonthlyExpenses = (): MonthlyExpense[] => [
  mockMonthlyExpense(),
  mockMonthlyExpense(),
  mockMonthlyExpense(),
];
