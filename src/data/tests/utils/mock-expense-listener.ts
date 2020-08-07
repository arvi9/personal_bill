import { ExpenseListener } from "@/data/protocols";

export class ExpenseListenerMock implements ExpenseListener {
  params: any;
  async update(params: ExpenseListener.Params): Promise<void> {
    this.params = params;
  }
}
