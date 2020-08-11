import faker from "faker";
import { HashComparer, Hasher } from "@/data/protocols";

export class HashSpy implements HashComparer, Hasher {
  params: any;
  text: string;
  hashedValue = faker.random.uuid();

  async compare(params: HashComparer.Params): Promise<boolean> {
    this.params = params;
    return Promise.resolve(true);
  }

  async hash(text: string): Promise<string> {
    this.text = text;
    return Promise.resolve(this.hashedValue);
  }
}
