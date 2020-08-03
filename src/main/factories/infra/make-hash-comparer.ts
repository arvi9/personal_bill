import { HashComparer } from "@/data/protocols";
import { BcryptAdapter } from "@/infra/utils/bcrypt-adapter";

export const makeHashComparer = (): HashComparer => {
  return new BcryptAdapter();
};
