import express from "express";
import ProductSchema from "../Models/ProductSchema.js";
import UserSchema from "../Models/UserSchema.js";
import bcrypt from "bcryptjs";
import Authenticate from "../Middleware/Authenticate.js";
import cookieParser from "cookie-parser";

const router = express.Router();

router.get(`/getproducts`, async (request, response) => {
    try {
        const productsData = await ProductSchema.find();

        response.status(201).json(productsData);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

router.get(`/getproductone/:id`, async (request, response) => {
    try {
        const { id } = request.params;

        const singleProduct = await ProductSchema.findOne({ id: id });

        response.status(201).json(singleProduct);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

router.post(`/registerdetails`, async (request, response) => {
    const { fname, email, mobile, password, passwordagain } = request.body;

    try {
        const preuseremail = await UserSchema.findOne({ email: email });
        const preusermobile = await UserSchema.findOne({ mobile: mobile });

        if (preuseremail || preusermobile) {
            response.status(422).json({ error: "This user is already present", status: 422 });
        } else if (!fname || !email || !mobile || !password || !passwordagain) {
            response.status(422).json({ error: "Fill the all data", status: 422 });
        } else if (password !== passwordagain) {
            response.status(422).json({ error: "Password doesn't matched!", status: 422 });
        } else {
            const finalUser = new UserSchema({ fname, email, mobile, password, passwordagain });

            const storeData = await finalUser.save();

            response.status(201).json(storeData);
        }
    } catch (error) {
        response.status(404).json({ message: error, status: 404 });
    }
});

router.post(`/loginuser`, async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        response.status(422).json({ error: "Please Fill the Details!", status: 422 });
    } else {
        try {
            const userLoginEmail = await UserSchema.findOne({ email: email });
            if (userLoginEmail) {
                const isMatch = await bcrypt.compare(password, userLoginEmail.password);

                // Generating Token
                const token = await userLoginEmail.generateAuthtokenn();

                // Cookie
                response.cookie("Amazonweb", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });

                // Comparing Password
                if (!isMatch) {
                    response.status(422).json({ error: "Invalid Password!", status: 422 });
                } else {
                    response.status(201).json(userLoginEmail);
                }
            } else {
                response.status(422).json({ error: "Invalid Email ID!", status: 422 });
            }
        } catch (error) {
            response.status(404).json({ error: "Invalid Details!", status: 404 });
        }
    }
});

// Adding Data into Cart
router.post(`/addcart/:id`, Authenticate, async (request, response) => {
    try {
        const { id } = request.params;
        const cart = await ProductSchema.findOne({ id: id });

        const userContact = await UserSchema.findOne({ _id: request.userId });
        // console.log("UserContact", userContact);

        if (userContact) {
            const cartData = await userContact.addCartData(cart);
            await userContact.save();

            // console.log("cartData", cartData);
            response.status(201).json(userContact);
        } else {
            response.status(422).json({ error: "Invalid User UserContact!", status: 422 });
        }
    } catch (error) {
        response.status(404).json({ error: "Invalid User!", status: 404 });
    }
})

// Get Cart Details
router.get(`/cartdetails`, Authenticate, async (request, response) => {
    try {
        const cartData = await UserSchema.findOne({ _id: request.userId });
        response.status(201).json(cartData);
    } catch (error) {
        response.status(422).json({ error: "Can not get data!", status: 422 });
    }
})

// Get Valid User
router.get(`/validuser`, Authenticate, async (request, response) => {
    try {
        const validuser = await UserSchema.findOne({ _id: request.userId });
        response.status(201).json(validuser);
    } catch (error) {
        response.status(422).json({ error: "Can not get data!", status: 422 });
    }
})

// Removing Data From Cart
router.delete(`/removecart/:id`, Authenticate, async (request, response) => {
    try {
        const { id } = request.params;

        request.rootUser.carts = request.rootUser.carts.filter((product) => {
            return product.id !== id;
        });

        request.rootUser.save();
        response.status(201).json(request.rootUser);
    } catch (error) {
        response.status(404).json({ error: "Can not remove data from cart!", status: 404 });
    }
});

// User Logout
router.get(`/logout`, Authenticate, async (request, response) => {
    try {
        request.rootUser.tokens = request.rootUser.tokens.filter((currentToken) => {
            return currentToken.token !== request.token;
        });

        response.clearCookie("Amazonweb", {
            path: "/"
        });

        request.rootUser.save();

        response.status(201).json(request.rootUser.tokens);
    } catch (error) {
        response.status(404).json({ error: "Can not Logout User!", status: 404 });
    }
})

export default router;