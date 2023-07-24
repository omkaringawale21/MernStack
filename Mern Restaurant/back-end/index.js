import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import ConnectionLoginDb from "./Database/Db.js";
import router from "./Routes/Router.js";
import Razorpay from "razorpay";

const app = express();

dotenv.config();

const PORT = 8000;

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

ConnectionLoginDb(username, password);

export const instance = new Razorpay({
  key_id: process.env.KEY_API_ID,
  key_secret: process.env.KEY_API_SECRET,
});

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Backend Server Is Running on PORT = ${PORT}`);
});
