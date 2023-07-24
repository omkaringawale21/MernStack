import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema({
  razorpay_payment_id: String,
  razorpay_order_id: String,
  razorpay_signature: String,
});

const paymentDetail = mongoose.model("paymentDetail", PaymentSchema);

export default paymentDetail;
