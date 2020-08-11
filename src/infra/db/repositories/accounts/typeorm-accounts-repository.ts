import { EntityRepository, getRepository, Repository } from "typeorm";
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository,
  AddAccountRepository,
} from "@/data/protocols";
import { AccountModel } from "@/infra/db/models/account";
import { LoadAccountByToken } from "@/domain/usecases";

@EntityRepository(AccountModel)
export class TypeOrmAccountsRepository
  implements
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository,
    AddAccountRepository {
  private repository: Repository<AccountModel>;

  constructor() {
    this.repository = getRepository(AccountModel);
  }

  async add(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Model> {
    const account = this.repository.create({
      name: params.name,
      email: params.email,
      password: params.password,
    });

    return this.repository.save(account);
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
    const existingAccount = await this.repository.findOne({
      where: {
        accessToken,
      },
    });

    if (!existingAccount) return null;

    const { updated_at, created_at, ...account } = existingAccount;
    return account;
  }
}
