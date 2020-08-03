import { UpdateAccessTokenRepository } from "@/data/protocols";
import { TypeOrmAccountsRepository } from "@/infra/db/repositories";

export const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  return new TypeOrmAccountsRepository();
};
