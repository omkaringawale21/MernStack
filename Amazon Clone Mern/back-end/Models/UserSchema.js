import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const secretkey = process.env.JWT_KEY;

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not valid email address!");
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    passwordagain: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    carts: Array
});

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordagain = await bcrypt.hash(this.passwordagain, 12);
    }

    next();
});

// Generate Token
UserSchema.methods.generateAuthtokenn = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, secretkey);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log("JWT generate token", error);
    }
}

// Add to cart data
UserSchema.methods.addCartData = async function (cart) {
    try {
        if (this.carts.length === 0) {
            console.log("Frist Product Added!");
            this.carts = this.carts.concat(cart);
            await this.save();
            return this.carts;
        } else {
            const sameId = this.carts.some(product => {
                return product.id === cart.id;
            });

            if (sameId) {
                console.log("Same Product!", sameId);
            } else {
                console.log("New Product Added!");
                this.carts = this.carts.concat(cart);
                await this.save();
                return this.carts;
            }
        }
    } catch (error) {
        console.log("Error In add to cart function", error);
    }
}

const userCollections = mongoose.model("userCollections", UserSchema);

export default userCollections;