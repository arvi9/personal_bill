import { Account } from "@/domain/models";

export interface LoadAccountByTokenRepository {
  loadByToken: (
    accessToken: string
  ) => Promise<LoadAccountByTokenRepository.Model>;
}

export namespace LoadAccountByTokenRepository {
  export type Model = Account;
}
