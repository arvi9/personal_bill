import { AddBill } from "@/domain/usecases";
import { AddBillRepository } from "@/data/protocols";

export class DbAddBill implements AddBill {
  constructor(private readonly addBillRepository: AddBillRepository) {}

  async add(params: AddBill.Params): Promise<AddBill.Model> {
    const bill = await this.addBillRepository.add(params);
    if (!bill) return null;

    return bill;
  }
}
