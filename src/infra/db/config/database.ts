import knex from "knex";
import path from "path";

const test = knex({
  client: "sqlite3",
  connection: ":memory:",
  migrations: {
    tableName: "migrations",
    directory: path.resolve(__dirname, "..", "migrations"),
  },
});

export default { test };
