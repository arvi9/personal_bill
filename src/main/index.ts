import "dotenv/config";
import "module-alias/register";
import "reflect-metadata";
import app from "@/main/config/app";
import connection from "@/infra/db/config/database";

connection.create().then(() => {
  app.listen(8080, () => console.log("Listen on 8080"));
});
