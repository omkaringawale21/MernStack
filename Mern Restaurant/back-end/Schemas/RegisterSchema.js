import mongoose from "mongoose";

const RegisterSchema = mongoose.Schema({
  userName: String,
  userId: String,
  userPhone: String,
  userPass: String,
  userAddCart: [
    {
      categoryDtl: String,
      foodPrice: Number,
      id: Number,
      imgUrl: String,
      nameDtl: String,
      foodQty: Number,
    },
  ],
  userOrders: [
    {
      categoryDtl: String,
      foodPrice: Number,
      id: Number,
      imgUrl: String,
      nameDtl: String,
      foodQty: Number,
    },
  ],
});

const registerDtl = mongoose.model("registerDtl", RegisterSchema);

export default registerDtl;
