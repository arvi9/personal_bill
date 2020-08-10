import { AddBill } from "@/domain/usecases";
import { DbAddBill } from "@/data/usecases";
import { makeBillsRepository } from "@/main/factories/infra";
import { makeUpdateMonthlyExpenses } from "./make-update-monthly-expenses";

export const makeAddBill = (): AddBill => {
  return new DbAddBill(makeBillsRepository(), [makeUpdateMonthlyExpenses()]);
};
