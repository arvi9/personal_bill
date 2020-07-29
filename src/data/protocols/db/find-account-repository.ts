import { Account } from "@/domain/models";

export interface FindAccountRepository {
  findByEmail: (email: string) => Promise<FindAccountRepository.Response>;
}

export namespace FindAccountRepository {
  export type Response = Account | undefined;
}
