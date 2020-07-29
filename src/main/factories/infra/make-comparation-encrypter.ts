import { ComparationEncrypter } from "@/data/protocols";
import { BcryptAdapter } from "@/infra/utils/bcrypt-adapter";

export const makeComparationEncrypter = (): ComparationEncrypter => {
  return new BcryptAdapter();
};
