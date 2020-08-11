import { SignUp } from "@/domain/usecases";
import { LoadAccountByEmailRepository } from "@/data/protocols";

export class DbSignUp implements SignUp {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async signup(params: SignUp.Params): Promise<SignUp.Model> {
    await this.loadAccountByEmailRepository.loadByEmail(params.email);
    return null;
  }
}
