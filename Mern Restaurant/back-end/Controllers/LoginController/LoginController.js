import RegisterSchema from "../../Schemas/RegisterSchema.js";

export const getDataRegister = async (request, response) => {
  try {
    const user = await RegisterSchema.find({});
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json({ message: message.error });
  }
};  
