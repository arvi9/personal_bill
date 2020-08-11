import { DbSignUp } from "@/data/usecases";
import { SignUp } from "@/domain/usecases";
import { TypeOrmAccountsRepository } from "@/infra/db/repositories";
import { makeHash, makeGenerateAccessToken } from "@/main/factories/infra";

export const makeSignUp = (): SignUp => {
  const accountsRepository = new TypeOrmAccountsRepository();
  return new DbSignUp(
    accountsRepository,
    makeHash(),
    accountsRepository,
    makeGenerateAccessToken(),
    accountsRepository
  );
};
