import express from "express";
import { Connection } from "./Database/Db.js";
import dotenv from "dotenv";
import router from "./Routes/Routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

const PORT = 8000;

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});
