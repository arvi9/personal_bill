import {
  LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
} from "@/data/protocols";
import { mockAccount } from "@/domain/tests/mock-account";

export class AccountsRepositorySpy
  implements LoadAccountByEmailRepository, LoadAccountByTokenRepository {
  email: string;
  accessToken: string;
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
}
