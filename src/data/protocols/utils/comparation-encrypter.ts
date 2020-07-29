export interface ComparationEncrypter {
  compare: (params: ComparationEncrypter.Params) => Promise<boolean>;
}

export namespace ComparationEncrypter {
  export type Params = {
    value: string;
    valueToCompare: string;
  };
}
