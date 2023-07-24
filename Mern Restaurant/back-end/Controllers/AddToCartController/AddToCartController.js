import AddToCart from "../../Schemas/RegisterSchema.js";

export const addProductToCart = async (request, response) => {
  const dtls = request.body;

  try {
    let user = await AddToCart.updateOne(
      { _id: request.params.id },
      { $addToSet: { userAddCart: dtls } }
    );
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
