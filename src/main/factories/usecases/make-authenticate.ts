import { DbAuthenticate } from "@/data/usecases";
import { Authenticate } from "@/domain/usecases";
import {
  makeGenerateAccessToken,
  makeHashComparer,
  makeLoadAccountByEmailRepository,
  makeUpdateAccessTokenRepository,
} from "@/main/factories/infra";

export const makeAuthenticate = (): Authenticate => {
  return new DbAuthenticate(
    makeLoadAccountByEmailRepository(),
    makeHashComparer(),
    makeGenerateAccessToken(),
    makeUpdateAccessTokenRepository()
  );
};
