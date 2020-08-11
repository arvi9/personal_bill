import faker from "faker";
import { SignUp } from "@/domain/usecases";

export class SignUpSpy implements SignUp {
  params: any;
  account = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    accessToken: faker.random.uuid(),
  };
  async signup(params: SignUp.Params): Promise<SignUp.Model> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}
