import User from "../Schema/UserSchema.js";

export const addUser = async (request, response) => {
  const user = request.body;

  const validatedUser = new User(user);

  try {
    await validatedUser.save();
    response.status(201).json(validatedUser);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUser = async (request, response) => {
  try {
    const users = await User.find({});
    response.status(201).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const users = await User.findOneAndDelete({ _id: request.params.id });
    response.status(201).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const editUser = async (request, response) => {
  try {
    const users = await User.findById(request.params.id);
    response.status(201).json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const updateUser = async (request, response) => {
  let user = request.body;
  let updatedUser = new User(user);

  try {
    const updatedUserInfo = await User.findByIdAndUpdate({_id: request.params.id}, updatedUser);
    response.status(201).json(updatedUserInfo);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
