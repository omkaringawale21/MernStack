import RegisterDtl from "../../Schemas/RegisterSchema.js";

export const addRegisterUser = async (request, response) => {
  const user = request.body;

  const validateUser = new RegisterDtl(user);

  try {
    await validateUser.save();
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getRegiaterData = async (request, response) => {
  try {
    const data = await RegisterDtl.find({});
    response.status(201).json(data);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
