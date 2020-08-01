import { Account } from "@/domain/models";

export interface LoadAccountByEmailRepository {
  loadByEmail: (
    email: string
  ) => Promise<LoadAccountByEmailRepository.Response>;
}

export namespace LoadAccountByEmailRepository {
  export type Response = Account | undefined;
}
