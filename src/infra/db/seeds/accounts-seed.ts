import { Repository } from "typeorm";
import { AccountModel } from "../models/account";
import { mockAccount } from "@/domain/tests/mock-account";

export const insertOneAccount = async (
  repository: Repository<AccountModel>,
  account = mockAccount()
): Promise<AccountModel> => {
  const created = repository.create(account);
  return await repository.save(created);
};
