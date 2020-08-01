import { UpdateAccessTokenRepository } from "@/data/protocols";

export class UpdateAccessTokenRepositoryMock
  implements UpdateAccessTokenRepository {
  params: any;
  async updateAccessToken(
    params: UpdateAccessTokenRepository.Params
  ): Promise<void> {
    this.params = params;
  }
}
