export interface UpdateMonthlyExpenses {
  update: (params: UpdateMonthlyExpenses.Params) => Promise<void>;
}

export namespace UpdateMonthlyExpenses {
  export type Params = {
    value: number;
    date: Date;
    amount: number;
    account: {
      id: string;
    };
  };
}
