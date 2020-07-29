import express from "express";
import connection from "../infra/db/config/database";

const app = express();

connection.create().then(() => {
  app.listen(8080, () => console.log("Listen on 8080"));
});
