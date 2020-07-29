import bcrypt from "bcrypt";
import { ComparationEncrypter } from "@/data/protocols";

export class BcryptAdapter implements ComparationEncrypter {
  async compare({
    value,
    valueToCompare,
  }: ComparationEncrypter.Params): Promise<boolean> {
    return bcrypt.compare(value, valueToCompare);
  }
}
