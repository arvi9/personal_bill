import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Account } from "@/domain/models";
import { ExpenseModel, BillModel } from "@/infra/db/models";

@Entity("accounts")
export class AccountModel implements Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ExpenseModel, (expense) => expense.account)
  expenses: ExpenseModel[];

  @OneToMany(() => BillModel, (bill) => bill.account)
  bills: BillModel[];

  @Column({ name: "access_token", nullable: true })
  accessToken: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
