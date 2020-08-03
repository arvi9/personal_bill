import { Account } from "@/domain/models";

export interface LoadAccountByToken {
  load: (accessToken: string) => Promise<LoadAccountByToken.Model>;
}

export namespace LoadAccountByToken {
  export type Model = Account;
}
