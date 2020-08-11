import { SignUp } from "@/domain/usecases";
import {
  LoadAccountByEmailRepository,
  Hasher,
  AddAccountRepository,
  GenerateAccessToken,
  UpdateAccessTokenRepository,
} from "@/data/protocols";

export class DbSignUp implements SignUp {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly generateAccessToken: GenerateAccessToken,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async signup(params: SignUp.Params): Promise<SignUp.Model> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email);
    const hashedPassword = await this.hasher.hash(params.password);

    const account = await this.addAccountRepository.add({
      email: params.email,
      name: params.name,
      password: hashedPassword,
    });

    const accessToken = this.generateAccessToken.generate({
      id: account.id,
      email: account.email,
    });

    await this.updateAccessTokenRepository.updateAccessToken({
      accessToken,
      accountId: account.id,
    });

    return null;
  }
}
