import { Authenticate } from "@/domain/usecases";
import { AccountsRepository } from "@/data/protocols";
import { AccountNotFoundError } from "@/domain/errors";

export class DbAuthenticate {
  constructor(private readonly accountsRepository: AccountsRepository) {}
  async auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    const account = await this.accountsRepository.findByEmail(params.email);

    if (!account) {
      throw new AccountNotFoundError();
    }

    return null;
  }
}
