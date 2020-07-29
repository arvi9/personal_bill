import { TypeOrmAccountsRepository } from "@/infra/db/repositories";
import { FindAccountRepository } from "@/data/protocols";

export const makeFindAccountRepository = (): FindAccountRepository => {
  return new TypeOrmAccountsRepository();
};
