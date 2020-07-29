import faker from "faker";
import { Account } from "../models";

export const mockAccount = (): Account => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  name: faker.name.findName(),
  password: faker.internet.password(),
});
