import { Authenticate } from "@/domain/usecases";
import {
  FindAccountRepository,
  ComparationEncrypter,
  GenerateAccessToken,
} from "@/data/protocols";

export class DbAuthenticate implements Authenticate {
  constructor(
    private readonly accountsRepository: FindAccountRepository,
    private readonly comparationEncrypter: ComparationEncrypter,
    private readonly generateAccessToken: GenerateAccessToken
  ) {}

  async auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    const account = await this.accountsRepository.findByEmail(params.email);

    if (!account) return null;

    const isEqual = await this.comparationEncrypter.compare({
      value: params.password,
      valueToCompare: account.password,
    });

    if (!isEqual) return null;

    const accessToken = this.generateAccessToken.generate({
      id: account.id,
      email: account.email,
    });

    return { accessToken, account: { id: account.id, name: account.name } };
  }
}
