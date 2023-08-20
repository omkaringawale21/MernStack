import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ConnectionDB from "./DB/ConnectionDB.js";
import DefaultData from "./DefaultData/DefaultData.js";
import router from "./Routes/Routes.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const userName = process.env.MONGODB_USERNAME;
const userPassword = process.env.MONGODB_USERPASSWORD;
const dataBaseName = process.env.MONGODB_DATABASE;

ConnectionDB(userName, userPassword, dataBaseName);

app.use(express.json());
app.use(cookieParser("*"));
app.use("*", cors({
    origin: true,
    credentials: true
}));
app.use(router);

// DefaultData();

app.listen(PORT, () => {
    console.log(`Back end server running on port ${PORT}`);
})