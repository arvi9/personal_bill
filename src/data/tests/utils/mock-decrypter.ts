import { Decrypter } from "@/data/protocols";

export class DecrypterSpy implements Decrypter {
  value: string;
  async decrypt(value: string): Promise<string> {
    this.value = value;
    return null;
  }
}
