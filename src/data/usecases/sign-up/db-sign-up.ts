import { SignUp } from "@/domain/usecases";
import {
  LoadAccountByEmailRepository,
  Hasher,
  AddAccountRepository,
} from "@/data/protocols";

export class DbSignUp implements SignUp {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async signup(params: SignUp.Params): Promise<SignUp.Model> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email);
    const hashedPassword = await this.hasher.hash(params.password);
    await this.addAccountRepository.add({
      email: params.email,
      name: params.name,
      password: hashedPassword,
    });
    return null;
  }
}
