import { HashComparer } from "@/data/protocols";
import { BcryptAdapter } from "@/infra/utils/bcrypt-adapter";

export const makeHash = (): BcryptAdapter => {
  const salt = 12;
  return new BcryptAdapter(salt);
};
