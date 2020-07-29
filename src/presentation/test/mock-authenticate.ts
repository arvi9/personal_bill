import { Authenticate } from "@/domain/usecases";
import { mockAccountWithToken } from "@/domain/tests/mock-account";

export class AuthenticateSpy implements Authenticate {
  params: any;
  account = mockAccountWithToken();
  async auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    this.params = params;
    return this.account;
  }
}
