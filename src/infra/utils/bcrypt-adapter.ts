import bcrypt from "bcrypt";
import { HashComparer, Hasher } from "@/data/protocols";

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salts: number) {}

  async hash(text: string): Promise<string> {
    return bcrypt.hash(text, this.salts);
  }

  async compare({
    value,
    valueToCompare,
  }: HashComparer.Params): Promise<boolean> {
    return bcrypt.compare(value, valueToCompare);
  }
}
