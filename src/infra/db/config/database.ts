import knex from "knex";

const test = knex({
  client: "sqlite3",
  connection: ":memory:",
});

export default { test };
