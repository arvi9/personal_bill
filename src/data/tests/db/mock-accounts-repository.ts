import { FindAccountRepository } from "@/data/protocols";
import { mockAccount } from "@/domain/tests/mock-account";

export class AccountsRepositorySpy implements FindAccountRepository {
  email: string;
  account = mockAccount();
  async findByEmail(email: string): Promise<FindAccountRepository.Response> {
    this.email = email;
    return this.account;
  }
}
