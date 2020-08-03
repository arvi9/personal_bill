import { LoadAccountByToken } from "@/domain/usecases";
import { mockAccount } from "@/domain/tests";

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accessToken: any;
  async load(
    accessToken: string,
    role?: string
  ): Promise<LoadAccountByToken.Model> {
    this.accessToken = accessToken;
    return Promise.resolve(mockAccount());
  }
}
