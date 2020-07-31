import { AddExpenseRepository } from "@/data/protocols";

export class AddExpenseRepositoryMock implements AddExpenseRepository {
  params: any;
  async add(
    params: AddExpenseRepository.Params
  ): Promise<AddExpenseRepository.Model> {
    this.params = params;
    return null;
  }
}
