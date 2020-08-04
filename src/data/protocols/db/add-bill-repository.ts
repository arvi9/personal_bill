import { AddBill } from "@/domain/usecases";

export interface AddBillRepository {
  add: (params: AddBillRepository.Params) => Promise<AddBillRepository.Model>;
}

export namespace AddBillRepository {
  export type Params = AddBill.Params;
  export type Model = AddBill.Model;
}
