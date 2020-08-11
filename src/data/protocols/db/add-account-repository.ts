import { Account } from "@/domain/models";

export interface AddAccountRepository {
  add: (
    params: AddAccountRepository.Params
  ) => Promise<AddAccountRepository.Model>;
}

export namespace AddAccountRepository {
  export type Params = Omit<Account, "id" | "accessToken">;
  export type Model = Account;
}
