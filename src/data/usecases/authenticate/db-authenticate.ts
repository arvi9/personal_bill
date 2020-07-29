import { Authenticate } from "@/domain/usecases";
import { AccountsRepository, ComparationEncrypter } from "@/data/protocols";
import { AccountNotFoundError, IncorrectPasswordError } from "@/domain/errors";

export class DbAuthenticate {
  constructor(
    private readonly accountsRepository: AccountsRepository,
    private readonly comparationEncrypter: ComparationEncrypter
  ) {}

  async auth(params: Authenticate.Params): Promise<Authenticate.Model> {
    const account = await this.accountsRepository.findByEmail(params.email);

    if (!account) {
      throw new AccountNotFoundError();
    }

    const isEqual = this.comparationEncrypter.compare({
      value: account.password,
      valueToCompare: params.password,
    });

    if (!isEqual) {
      throw new IncorrectPasswordError();
    }

    return null;
  }
}
