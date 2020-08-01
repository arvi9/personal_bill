import { LoadAccountByEmailRepository } from "@/data/protocols";
import { mockAccount } from "@/domain/tests/mock-account";

export class AccountsRepositorySpy implements LoadAccountByEmailRepository {
  email: string;
  account = mockAccount();
  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Response> {
    this.email = email;
    return this.account;
  }
}
