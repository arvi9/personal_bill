import express from "express";
import connection from "../infra/db/config/database";
import Routes from "./routes/routes";

const app = express();
app.use(Routes);

connection.create().then(() => {
  app.listen(8080, () => console.log("Listen on 8080"));
});
