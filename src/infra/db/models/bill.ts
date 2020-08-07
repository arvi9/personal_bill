import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Bill, Account } from "@/domain/models";
import { AccountModel } from ".";

@Entity("bills")
export class BillModel implements Bill {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AccountModel, (account) => account.bills)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column({ name: "due_date" })
  dueDate: number;

  @Column({ name: "first_payment_date" })
  firstPaymentDate: Date;

  @Column({ name: "amount" })
  amount: number;

  @Column({ name: "active" })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
