import { ComparationEncrypter } from "@/data/protocols";

export class ComparationEncrypterSpy implements ComparationEncrypter {
  params: any;
  async compare(params: ComparationEncrypter.Params): Promise<boolean> {
    this.params = params;
    return Promise.resolve(true);
  }
}
