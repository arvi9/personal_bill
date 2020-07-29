export interface ComparationEncrypter {
  compare: (params: ComparationEncrypter.Params) => boolean;
}

export namespace ComparationEncrypter {
  export type Params = {
    value: string;
    valueToCompare: string;
  };
}
