import { UpdateAccessTokenRepository } from "@/data/protocols";

export class UpdateAccessTokenRepositoryMock
  implements UpdateAccessTokenRepository {
  params: any;
  async update(params: UpdateAccessTokenRepository.Params): Promise<void> {
    this.params = params;
  }
}
