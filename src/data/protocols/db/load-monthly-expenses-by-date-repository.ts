import { MonthlyExpense } from "@/domain/models";

export interface LoadMonthlyExpensesByDateRepository {
  loadByDate: (
    params: LoadMonthlyExpensesByDateRepository.Params
  ) => Promise<LoadMonthlyExpensesByDateRepository.Model>;
}

export namespace LoadMonthlyExpensesByDateRepository {
  export type Params = {
    account: {
      id: string;
    };
    date: Date;
  };
  export type Model = MonthlyExpense[];
}
