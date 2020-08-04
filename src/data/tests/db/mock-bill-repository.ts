import faker from "faker";
import { AddBillRepository } from "@/data/protocols";
import { mockBill, mockAccount } from "@/domain/tests";

export class AddBillRepositorySpy implements AddBillRepository {
  params: any;
  bill = {
    ...mockBill(),
    id: faker.random.uuid(),
    account: mockAccount(),
  };
  async add(
    params: AddBillRepository.Params
  ): Promise<AddBillRepository.Model> {
    this.params = params;
    return Promise.resolve(this.bill);
  }
}
