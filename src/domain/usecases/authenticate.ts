export interface Authenticate {
  auth: (params: Authenticate.Params) => Promise<Authenticate.Model>;
}

export namespace Authenticate {
  export type Params = {
    email: string;
    password: string;
  };
  export type Model = {
    accessToken: string;
    account: {
      id: string;
      name: string;
    };
  };
}
