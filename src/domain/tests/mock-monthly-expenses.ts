import faker from "faker";
import { MonthlyExpense } from "@/domain/models";
import { mockAccount } from "./mock-account";

export const mockMonthlyExpense = (
  account = mockAccount()
): MonthlyExpense => ({
  id: faker.random.uuid(),
  value: faker.random.number(),
  year: 2020,
  month: 6,
  account,
});

export const mockMonthlyExpenses = (): MonthlyExpense[] => [
  mockMonthlyExpense(),
  mockMonthlyExpense(),
  mockMonthlyExpense(),
];
