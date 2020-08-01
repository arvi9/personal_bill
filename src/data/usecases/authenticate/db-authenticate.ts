import { Authenticate } from "@/domain/usecases";
import {
  LoadAccountByEmailRepository,
  HashComparer,
  GenerateAccessToken,
  UpdateAccessTokenRepository,
} from "@/data/protocols";

export class DbAuthenticate implements Authenticate {
  constructor(
    private readonly accountsRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly generateAccessToken: GenerateAccessToken,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    const account = await this.accountsRepository.load(params.email);

    if (!account) return null;

    const isEqual = await this.hashComparer.compare({
      value: params.password,
      valueToCompare: account.password,
    });

    if (!isEqual) return null;

    const accessToken = this.generateAccessToken.generate({
      id: account.id,
      email: account.email,
    });

    await this.updateAccessTokenRepository.update({
      accountId: account.id,
      accessToken,
    });

    return { accessToken, account: { id: account.id, name: account.name } };
  }
}
