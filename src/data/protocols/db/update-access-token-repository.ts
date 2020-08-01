export interface UpdateAccessTokenRepository {
  update: (params: UpdateAccessTokenRepository.Params) => Promise<void>;
}

export namespace UpdateAccessTokenRepository {
  export type Params = {
    accountId: string;
    accessToken: string;
  };
}
