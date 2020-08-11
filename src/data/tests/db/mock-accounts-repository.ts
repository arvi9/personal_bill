import {
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  AddAccountRepository,
} from "@/data/protocols";
import { mockAccount } from "@/domain/tests/mock-account";

export class AccountsRepositorySpy
  implements
    LoadAccountByEmailRepository,
    LoadAccountByTokenRepository,
    AddAccountRepository {
  email: string;
  accessToken: string;
  addParams: any;
  account = mockAccount();

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Response> {
    this.email = email;
    return this.account;
  }

  async loadByToken(
    accessToken: string
  ): Promise<LoadAccountByTokenRepository.Model> {
    this.accessToken = accessToken;
    return this.account;
  }

  async add(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Model> {
    this.addParams = params;
    return Promise.resolve(this.account);
  }
}
