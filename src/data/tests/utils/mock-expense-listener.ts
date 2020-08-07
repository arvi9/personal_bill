import { UpdateMonthlyExpenses } from "@/domain/usecases";

export class ExpenseListenerMock implements UpdateMonthlyExpenses {
  params: any;
  async update(params: UpdateMonthlyExpenses.Params): Promise<void> {
    this.params = params;
  }
}
