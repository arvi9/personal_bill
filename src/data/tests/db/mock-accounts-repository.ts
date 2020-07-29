import { AccountsRepository } from "@/data/protocols";
import { Account } from "@/domain/models";
import { mockAccount } from "@/domain/tests/mock-account";

export class AccountsRepositorySpy implements AccountsRepository {
  email: string;
  account = mockAccount();
  async findByEmail(email: string): Promise<Account | undefined> {
    this.email = email;
    return this.account;
  }
}
