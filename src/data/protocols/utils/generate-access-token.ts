export interface GenerateAccessToken {
  generate: (params: GenerateAccessToken.Params) => string;
}

export namespace GenerateAccessToken {
  export type Params = {
    id: string;
    email: string;
  };
}
