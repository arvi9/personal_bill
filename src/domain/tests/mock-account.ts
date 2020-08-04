import faker from "faker";
import { Account } from "@/domain/models";
import { Authenticate } from "@/domain/usecases";

export const mockAccount = (): Account => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  name: faker.name.findName(),
  accessToken: faker.random.uuid(),
  password: faker.internet.password(),
});

export const mockAccountWithToken = (): Authenticate.Model => ({
  accessToken: faker.random.uuid(),
  account: {
    id: faker.random.uuid(),
    name: faker.name.findName(),
  },
});
