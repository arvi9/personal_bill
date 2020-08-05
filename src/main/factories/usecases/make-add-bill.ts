import { AddBill } from "@/domain/usecases";
import { DbAddBill } from "@/data/usecases";
import { makeBillsRepository } from "@/main/factories/infra";

export const makeAddBill = (): AddBill => {
  return new DbAddBill(makeBillsRepository());
};
