import { LoadAccountByToken } from "@/domain/usecases";
import { Decrypter, LoadAccountByTokenRepository } from "@/data/protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(accessToken: string): Promise<LoadAccountByToken.Model> {
    const token = await this.decrypter.decrypt(accessToken);
    if (!token) return null;

    const account = await this.loadAccountByTokenRepository.loadByToken(
      accessToken
    );

    return account ? account : null;
  }
}
