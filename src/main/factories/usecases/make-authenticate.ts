import { DbAuthenticate } from "@/data/usecases";
import { Authenticate } from "@/domain/usecases";
import {
  makeGenerateAccessToken,
  makeComparationEncrypter,
  makeFindAccountRepository,
} from "@/main/factories/infra";

export const makeAuthenticate = (): Authenticate => {
  return new DbAuthenticate(
    makeFindAccountRepository(),
    makeComparationEncrypter(),
    makeGenerateAccessToken()
  );
};
