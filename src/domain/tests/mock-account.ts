import faker from "faker";
import { Account } from "../models";
import { Authenticate } from "../usecases";

export const mockAccount = (): Account => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
});

export const mockAccountWithToken = (): Authenticate.Model => ({
  accessToken: faker.random.uuid(),
  account: {
    id: faker.random.uuid(),
    name: faker.name.findName(),
  },
});
