export interface HashComparer {
  compare: (params: HashComparer.Params) => Promise<boolean>;
}

export namespace HashComparer {
  export type Params = {
    value: string;
    valueToCompare: string;
  };
}
