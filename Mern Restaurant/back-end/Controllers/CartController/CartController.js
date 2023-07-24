import CartItem from "../../Schemas/RegisterSchema.js";

export const getNoOfCartItem = async (request, response) => {
  try {
    let user = await CartItem.findOne({ _id: request.params.id });
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const deleteCartItem = async (request, response) => {
  const dtls = request.body;

  try {
    let user = await CartItem.updateOne(
      { _id: request.params.id },
      { $pull: { userAddCart: dtls } }
    );
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const removeCartItem = async (request, response) => {
  const dtls = request.body;

  try {
    let user = await CartItem.updateOne(
      {
        _id: request.params.id,
        userAddCart: {
          $elemMatch: { _id: dtls._id, foodQty: 0 },
        },
      },
      { $pull: { userAddCart: dtls } }
    );
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const incrementQty = async (request, response) => {
  const dtls = request.body;

  try {
    let user = await CartItem.updateOne(
      {
        _id: request.params.id,
        userAddCart: {
          $elemMatch: { _id: dtls._id },
        },
      },
      { $set: { "userAddCart.$.foodQty": Number(dtls.foodQty) } }
    );
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const decrementQty = async (request, response) => {
  const dtls = request.body;

  try {
    let user = await CartItem.updateOne(
      {
        _id: request.params.id,
        userAddCart: {
          $elemMatch: { _id: dtls._id },
        },
      },
      { $set: { "userAddCart.$.foodQty": Number(dtls.foodQty) } }
    );
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
