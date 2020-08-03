import { LoadAccountByToken } from "@/domain/usecases";
import { mockAccount } from "@/domain/tests";

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: any;
  account = mockAccount();
  async load(accessToken: string): Promise<LoadAccountByToken.Model> {
    this.accessToken = accessToken;
    return Promise.resolve(this.account);
  }
}
