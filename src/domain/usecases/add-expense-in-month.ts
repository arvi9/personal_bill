export interface AddExpenseInMonth {
  add: (params: AddExpenseInMonth.Params) => Promise<void>;
}

export namespace AddExpenseInMonth {
  export type Params = {
    value: number;
    date: Date;
  };
}
