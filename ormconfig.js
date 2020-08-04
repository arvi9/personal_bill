module.exports = {
  name: "default",
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./src/infra/db/models/**/*.ts"],
  migrations: ["./src/infra/db/migrations/**.ts"],
  logging: true,
  cli: {
    migrationsDir: "./src/infra/db/migrations/",
  },
};
