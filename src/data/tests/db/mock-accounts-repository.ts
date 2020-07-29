import { AccountsRepository } from "@/data/protocols";

export class AccountsRepositorySpy implements AccountsRepository {
  email: string;
  async findByEmail(email: string): Promise<Account | undefined> {
    this.email = email;
    return null;
  }
}
