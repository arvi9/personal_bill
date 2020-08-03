import { EntityRepository, getRepository, Repository } from "typeorm";
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
} from "@/data/protocols";
import { AccountModel } from "@/infra/db/models/account";
import { LoadAccountByToken } from "@/domain/usecases";

@EntityRepository(AccountModel)
export class TypeOrmAccountsRepository
  implements
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
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

  async loadByToken(accessToken: string): Promise<LoadAccountByToken.Model> {
    const {
      created_at,
      updated_at,
      ...account
    } = await this.repository.findOne({
      where: {
        accessToken,
      },
    });

    return account;
  }
}
