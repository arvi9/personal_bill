import path from "path";

export default {
  client: "sqlite3",
  connection: ":memory:",
  useNullAsDefault: true,
  migrations: {
    tableName: "migrations",
    directory: path.resolve(__dirname, "..", "migrations"),
  },
};
