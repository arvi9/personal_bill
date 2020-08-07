import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMonthlyExpensesTable1596764424628
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "monthly_expenses",
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
            name: "value",
            type: "decimal",
            length: "10, 2",
          },
          {
            name: "month",
            type: "integer",
          },
          {
            name: "year",
            type: "integer",
          },
          {
            name: "first_payment_date",
            type: "date",
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
            name: "monthly_expenses_account_id_foreign",
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
    await queryRunner.dropTable("monthly_expenses");
  }
}
