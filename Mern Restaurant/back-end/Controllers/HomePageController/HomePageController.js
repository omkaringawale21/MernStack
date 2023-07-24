import HomeDtl from "../../Schemas/RegisterSchema.js";

export const setDataToHomePage = async (request, response) => {
  try {
    const user = await HomeDtl.findById(request.params.id);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: message.error });
  }
};

export const getDataFromCart = async (request, response) => {
  try {
    const user = await HomeDtl.findById(request.params.id);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: message.error });
  }
};
