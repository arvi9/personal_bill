import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAccountsTable1596047844300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "accounts",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            generationStrategy: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "128",
          },
          {
            name: "email",
            type: "varchar",
            length: "128",
          },
          {
            name: "password",
            type: "varchar",
            length: "128",
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
    await queryRunner.dropTable("accounts");
  }
}
