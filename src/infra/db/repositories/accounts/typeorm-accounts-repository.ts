import { EntityRepository, getRepository } from "typeorm";
import { FindAccountRepository } from "@/data/protocols";
import { AccountModel } from "@/infra/db/models/account";

@EntityRepository(AccountModel)
export class TypeOrmAccountsRepository implements FindAccountRepository {
  constructor(private readonly repository = getRepository(AccountModel)) {}

  async findByEmail(email: string): Promise<FindAccountRepository.Response> {
    const account = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!account) return null;

    const { created_at, updated_at, ...restAccount } = account;
    return restAccount;
  }
}
