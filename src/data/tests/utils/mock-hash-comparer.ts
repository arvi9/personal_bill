import { HashComparer } from "@/data/protocols";

export class HashComparerSpy implements HashComparer {
  params: any;
  async compare(params: HashComparer.Params): Promise<boolean> {
    this.params = params;
    return Promise.resolve(true);
  }
}
