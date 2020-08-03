import { TypeOrmAccountsRepository } from "@/infra/db/repositories";
import { LoadAccountByEmailRepository } from "@/data/protocols";

export const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  return new TypeOrmAccountsRepository();
};
