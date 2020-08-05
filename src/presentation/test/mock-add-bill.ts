import faker from "faker";
import { AddBill } from "@/domain/usecases";
import { mockBill, mockAccount } from "@/domain/tests";

export class AddBillSpy implements AddBill {
  params: any;
  bill = {
    ...mockBill(),
    id: faker.random.uuid(),
    account: mockAccount(),
  };
  async add(params: AddBill.Params): Promise<AddBill.Model> {
    this.params = params;
    return Promise.resolve(this.bill);
  }
}
