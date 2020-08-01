import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("access_tokens")
export class AccessToken {
  @ObjectIdColumn()
  id: ObjectID;

  @Column("uuid")
  account_id: string;

  @Column()
  access_token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
