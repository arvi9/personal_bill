import { DbAuthenticate } from "@/data/usecases";
import { Authenticate } from "@/domain/usecases";
import {
  makeGenerateAccessToken,
  makeHash,
  makeLoadAccountByEmailRepository,
  makeUpdateAccessTokenRepository,
} from "@/main/factories/infra";

export const makeAuthenticate = (): Authenticate => {
  return new DbAuthenticate(
    makeLoadAccountByEmailRepository(),
    makeHash(),
    makeGenerateAccessToken(),
    makeUpdateAccessTokenRepository()
  );
};
