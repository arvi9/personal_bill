import { ComparationEncrypter } from "@/data/protocols";

export class ComparationEncrypterSpy implements ComparationEncrypter {
  params: any;
  compare(params: ComparationEncrypter.Params): boolean {
    this.params = params;
    return true;
  }
}
