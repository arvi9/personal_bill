import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Account, MonthlyExpense } from "@/domain/models";
import { AccountModel } from ".";

@Entity("monthly_expenses")
export class MonthlyExpensesModel implements MonthlyExpense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AccountModel)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column()
  value: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
