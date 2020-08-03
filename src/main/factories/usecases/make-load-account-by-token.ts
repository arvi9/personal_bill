import { LoadAccountByToken } from "@/domain/usecases";
import { DbLoadAccountByToken } from "@/data/usecases";
import { JwtTokenAdapter } from "@/infra/utils/jwt-token-adapter";
import { TypeOrmAccountsRepository } from "@/infra/db/repositories/accounts/typeorm-accounts-repository";

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtTokenAdapter(process.env.JWT_SECRET_KEY);
  const accountsRepository = new TypeOrmAccountsRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountsRepository);
};
