import OrderCartItem from "../../Schemas/RegisterSchema.js";

export const getOrderProductLists = async (request, response) => {
  try {
    await OrderCartItem.find({ _id: request.params.id });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const addOrderProductLists = async (request, response) => {
  const dtls = request.body;

  try {
    const user = await OrderCartItem.updateOne(
      {
        _id: request.params.id,
        userAddCart: {
          $elemMatch: { _id: dtls._id },
        },
      },
      {
        $addToSet: {
          userOrders: dtls,
        },
      }
    );
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
