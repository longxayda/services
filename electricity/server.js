import express from "express";
import { PORT } from "./config/index.js";
import { expressApp } from "./express-app.js";
import { databaseConnection } from "./database/connection.js";

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`Electricity service listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
    .on("close", () => {
      // channel.close();
    });
};

StartServer();
