import axios from "axios";

const URL = `http://localhost:8000`;

export const addUser = async (data) => {
  try {
    return await axios.post(`${URL}/add`, data);
  } catch (error) {
    console.log("Error while calling add user API", error);
  }
};

export const getUsers = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (error) {
    console.log("Error while calling get user API", error);
  }
};

export const deleteUser = async (id) => {
  try {
    return await axios.delete(`${URL}/all/${id}`);
  } catch (error) {
    console.log("Error while calling delete user API", error);
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`${URL}/edit/${id}`);
  } catch (error) {
    console.log("Error while calling get for update user API", error);
  }
};

export const updateUser = async (userDtls, id) => {
  try {
    return await axios.put(`${URL}/edit/${id}`, userDtls);
  } catch (error) {
    console.log("Error while calling get for update user API", error);
  }
};