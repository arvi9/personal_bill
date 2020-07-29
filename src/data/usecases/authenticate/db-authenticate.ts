import { Authenticate } from "@/domain/usecases";
import { AccountsRepository } from "@/data/protocols";

export class DbAuthenticate {
  constructor(private readonly accountsRepository: AccountsRepository) {}
  async auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    await this.accountsRepository.findByEmail(params.email);
    return null;
  }
}
