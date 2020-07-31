import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExpensesTable1596221864437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "expenses",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            generationStrategy: "uuid",
            isPrimary: true,
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
            name: "date",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("expenses");
  }
}
