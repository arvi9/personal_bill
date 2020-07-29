import { Account } from "@/domain/models";

export interface AccountsRepository {
  findByEmail: (email: string) => Promise<AccountsRepository.Response>;
}

export namespace AccountsRepository {
  export type Response = Account | undefined;
}
