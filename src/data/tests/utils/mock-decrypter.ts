import faker from "faker";
import { Decrypter } from "@/data/protocols";

export class DecrypterSpy implements Decrypter {
  value: string;
  returnValue = faker.random.word();
  async decrypt(value: string): Promise<string> {
    this.value = value;
    return this.returnValue;
  }
}
