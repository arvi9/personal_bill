import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBillsTable1596586839653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bills",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "account_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "description",
            type: "varchar",
            length: "128",
          },
          {
            name: "value",
            type: "decimal",
            length: "10, 2",
          },
          {
            name: "due_date",
            type: "integer",
          },
          {
            name: "first_payment_date",
            type: "date",
          },
          {
            name: "amount",
            type: "integer",
          },
          {
            name: "active",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "bills_account_id_foreign",
            columnNames: ["account_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "accounts",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("bills");
  }
}
