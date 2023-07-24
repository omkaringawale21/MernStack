import { instance } from "../../index.js";
import crypto from "crypto";
import PaymentSchema from "../../Schemas/PaymentSchema.js";

export const checkout = async (request, response) => {
  const price = request.body.amount;
  try {
    const options = {
      amount: Number(price * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    response.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const paymentVarification = async (request, response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    request.body;
  const id = request.params.id;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database is here
    const paymentDetails = new PaymentSchema({
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    });
    await paymentDetails.save();

    response.redirect(
      `http://localhost:3000/home/${id}/cart/paymentSuccess?reference=${razorpay_payment_id}`
    );
  } else {
    response.status(404).json({ success: false });
  }
};

export const getRazorpayKey = async (request, response) => {
  try {
    response.status(201).json({
      key: process.env.KEY_API_ID,
    });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
