import bcrypt from "bcrypt";
import { HashComparer } from "@/data/protocols";

export class BcryptAdapter implements HashComparer {
  async compare({
    value,
    valueToCompare,
  }: HashComparer.Params): Promise<boolean> {
    return bcrypt.compare(value, valueToCompare);
  }
}
