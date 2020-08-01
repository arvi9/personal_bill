import { EntityRepository, getRepository, Repository } from "typeorm";
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "@/data/protocols";
import { AccountModel } from "@/infra/db/models/account";

@EntityRepository(AccountModel)
export class TypeOrmAccountsRepository
  implements LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  private repository: Repository<AccountModel>;

  constructor() {
    this.repository = getRepository(AccountModel);
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Response> {
    const account = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!account) return null;

    const { created_at, updated_at, ...restAccount } = account;
    return restAccount;
  }

  async updateAccessToken(
    params: UpdateAccessTokenRepository.Params
  ): Promise<void> {
    const account = await this.repository.findOne(params.accountId);
    account.accessToken = params.accessToken;
    await this.repository.save(account);
  }
}
