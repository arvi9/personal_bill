import { AddExpenseRepository } from "@/data/protocols";
import { TypeOrmAddExpenseRepository } from "@/infra/db/repositories";

export const makeAddExpenseRepository = (): AddExpenseRepository => {
  return new TypeOrmAddExpenseRepository();
};
