import { TypeOrmBillsRepository } from "@/infra/db/repositories";

export const makeBillsRepository = (): TypeOrmBillsRepository => {
  return new TypeOrmBillsRepository();
};
