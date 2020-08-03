import { LoadAccountByToken } from "@/domain/usecases";
import { Decrypter } from "@/data/protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(private readonly decrypter: Decrypter) {}

  async load(accessToken: string): Promise<LoadAccountByToken.Model> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}
