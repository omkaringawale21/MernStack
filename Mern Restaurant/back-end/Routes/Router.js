import express from "express";
import {
  addRegisterUser,
  getRegiaterData,
} from "../Controllers/RegisterController/RegisterController.js";
import { getDataRegister } from "../Controllers/LoginController/LoginController.js";
import {
  getDataFromCart,
  setDataToHomePage,
} from "../Controllers/HomePageController/HomePageController.js";
import { addProductToCart } from "../Controllers/AddToCartController/AddToCartController.js";
import {
  decrementQty,
  deleteCartItem,
  getNoOfCartItem,
  incrementQty,
  removeCartItem,
} from "../Controllers/CartController/CartController.js";
import {
  checkout,
  getRazorpayKey,
  paymentVarification,
} from "../Controllers/PaymentController/PaymentController.js";
import { addOrderProductLists, getOrderProductLists } from "../Controllers/OrderCartController/OrderCartController.js";

const router = express.Router();

router.get("/login", getDataRegister);
router.post("/register", addRegisterUser);
router.get("/register", getRegiaterData);
router.get("/home/:id", setDataToHomePage);
router.get("/home/:id", getDataFromCart);
router.put("/home/:id", addProductToCart);
router.get("/home/:id/cart", getNoOfCartItem);
router.put("/home/:id/cart/delete_cart_item", deleteCartItem);
router.put("/home/:id/cart/remove_cart_item", removeCartItem);
router.put("/home/:id/cart/increment_qty", incrementQty);
router.put("/home/:id/cart/decrement_qty", decrementQty);
router.put("/home/:id/orders_lists", addOrderProductLists);
router.get("/home/:id/orders_lists", getOrderProductLists);

router.route("/home/:id/cart/checkout").post(checkout);
router.route("/home/:id/cart/payment_varification").post(paymentVarification);
router.route("/home/:id/cart/getkey").get(getRazorpayKey);

export default router;
