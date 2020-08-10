import faker from "faker";
import { mockAccount } from "./mock-account";
import { AddExpense } from "../usecases";

export const mockAddExpense = () => {
  const { id } = mockAccount();

  return {
    date: faker.date.recent(),
    description: faker.random.words(),
    value: faker.random.number(),
    account: {
      id,
    },
  };
};
