import express from "express";
import jwt from "jsonwebtoken";
import UserSchema from "../Models/UserSchema.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const secretkey = process.env.JWT_KEY;

const Authenticate = async (request, response, next) => {
    try {
        const token = request.cookies.Amazonweb;

        const verifyToken = jwt.verify(token, secretkey);

        // console.log("verifyToken", verifyToken);

        const rootUser = await UserSchema.findOne({ _id: verifyToken._id, "tokens.token": token });

        // console.log("rootUser", rootUser);

        if (!rootUser) {
            response.status(422).json({ error: "User not Found! Please Login", status: 422 });
        }

        request.token = token;
        request.rootUser = rootUser;
        request.userId = rootUser._id;

        next();
    } catch (error) {
        response.status(404).json({ error: "User not Found! Please Login", status: 404 });
    }
}

export default Authenticate;