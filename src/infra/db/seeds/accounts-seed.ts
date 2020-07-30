import { Repository } from "typeorm";
import { AccountModel } from "../models/account";
import { mockAccount } from "@/domain/tests/mock-account";

export const insertOneAccount = async (
  repository: Repository<AccountModel>,
  account = mockAccount()
): Promise<void> => {
  const created = repository.create(account);
  await repository.save(created);
};
