import { AddBill } from "@/domain/usecases";
import {
  AddBillRepository,
  ExpenseListener,
  ExpensePublisher,
} from "@/data/protocols";

export class DbAddBill extends ExpensePublisher implements AddBill {
  private bill: AddBill.Model;

  constructor(
    private readonly addBillRepository: AddBillRepository,
    protected readonly expensesListeners: ExpenseListener[]
  ) {
    super(expensesListeners);
  }

  async add(params: AddBill.Params): Promise<AddBill.Model> {
    this.bill = await this.addBillRepository.add(params);

    if (!this.bill) {
      return null;
    }

    await this.notifyListeners();
    return this.bill;
  }

  async notifyListeners(): Promise<void> {
    for (const listener of this.expensesListeners) {
      await listener.update({
        account: {
          id: this.bill.account.id,
        },
        amount: this.bill.amount,
        date: this.bill.firstPaymentDate,
        value: this.bill.value,
      });
    }
  }
}
