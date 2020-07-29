import bcrypt from "bcrypt";
import { ComparationEncrypter } from "@/data/protocols";

export class BcryptAdapter {
  async compare({
    value,
    valueToCompare,
  }: ComparationEncrypter.Params): Promise<boolean> {
    await bcrypt.compare(value, valueToCompare);
    return null;
  }
}
