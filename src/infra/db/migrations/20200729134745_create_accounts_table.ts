import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("accounts", (table: Knex.TableBuilder) => {
    table.bigIncrements("id");
    table.string("name");
    table.string("email");
    table.string("password");
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("accounts");
}
