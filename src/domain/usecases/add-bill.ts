import { Bill } from "@/domain/models";

export interface AddBill {
  add: (params: AddBill.Params) => Promise<AddBill.Model>;
}

export namespace AddBill {
  export type Params = Omit<Bill, "id" | "account"> & {
    account: {
      id: string;
    };
  };
  export type Model = Bill;
}
