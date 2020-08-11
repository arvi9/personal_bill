import { SignUp } from "@/domain/usecases";
import { LoadAccountByEmailRepository, Hasher } from "@/data/protocols";

export class DbSignUp implements SignUp {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async signup(params: SignUp.Params): Promise<SignUp.Model> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email);
    await this.hasher.hash(params.password);
    return null;
  }
}
