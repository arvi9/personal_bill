import { EntityRepository, getRepository, Repository } from "typeorm";
import { FindAccountRepository } from "@/data/protocols";
import { AccountModel } from "@/infra/db/models/account";

@EntityRepository(AccountModel)
export class TypeOrmAccountsRepository implements FindAccountRepository {
  private repository: Repository<AccountModel>;

  async findByEmail(email: string): Promise<FindAccountRepository.Response> {
    this.repository = getRepository(AccountModel);
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
