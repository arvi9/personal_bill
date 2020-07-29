import { EntityRepository, getRepository } from "typeorm";
import { AccountsRepository } from "@/data/protocols";
import { AccountModel } from "@/infra/db/models/account";

@EntityRepository(AccountModel)
export class TypeOrmAccountsRepository implements AccountsRepository {
  constructor(private readonly repository = getRepository(AccountModel)) {}

  async findByEmail(email: string): Promise<AccountsRepository.Response> {
    const account = await this.repository.findOne({
      where: {
        email,
      },
    });

    const { created_at, updated_at, ...restAccount } = account;
    return restAccount;
  }
}
