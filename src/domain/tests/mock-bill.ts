import faker from "faker";
import { mockAccount } from "./mock-account";
import { AddBill } from "../usecases";

export const mockBill = (): AddBill.Params => {
  const { id } = mockAccount();

  return {
    dueDate: faker.random.number(31),
    expirationDate: faker.date.future(),
    description: faker.random.words(),
    value: faker.random.number(),
    account: {
      id,
    },
  };
};
