import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Expense } from "@/domain/models";
import { AccountModel } from "./account";

@Entity("expenses")
export class ExpenseModel implements Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => AccountModel, (account) => account.expenses)
  @JoinColumn({ name: "account_id" })
  account: AccountModel;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
