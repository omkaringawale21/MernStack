import axios from "axios";

const URL = `http://localhost:8000`;

export const registerApiPost = async (data) => {
  try {
    return await axios.post(`${URL}/register`, data);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const getDataRegister = async () => {
  try {
    return await axios.get(`${URL}/login`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const getDataForValidatRegister = async () => {
  try {
    return await axios.get(`${URL}/register`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const getUserIdToHomePage = async (id) => {
  try {
    return await axios.get(`${URL}/home/${id}`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const putCartData = async (id, product) => {
  try {
    return await axios.put(`${URL}/home/${id}`, product);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const getDataFromCart = async (id) => {
  try {
    return await axios.get(`${URL}/home/${id}`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const lengthOfCartArr = async (id) => {
  try {
    return await axios.get(`${URL}/home/${id}/cart`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const deleteItemCartArr = async (id, product) => {
  try {
    return await axios.put(`${URL}/home/${id}/cart/delete_cart_item`, product);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const removeItemCartArr = async (id, product) => {
  try {
    return await axios.put(`${URL}/home/${id}/cart/remove_cart_item`, product);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const incrementQtyFood = async (id, product) => {
  try {
    return await axios.put(`${URL}/home/${id}/cart/increment_qty`, product);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const decrementQtyFood = async (id, product) => {
  try {
    return await axios.put(`${URL}/home/${id}/cart/decrement_qty`, product);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const checkoutHandler = async (id, amount) => {
  try {
    return await axios.post(`${URL}/home/${id}/cart/checkout`, {
      amount,
    });
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const getRazorpayKey = async (id) => {
  try {
    return await axios.get(`${URL}/home/${id}/cart/getkey`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const addOrderProductLists = async (id, products) => {
  try {
    return await axios.put(`${URL}/home/${id}/orders_lists`, products);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};

export const getOrderProductLists = async (id) => {
  try {
    return await axios.get(`${URL}/home/${id}/orders_lists`);
  } catch (error) {
    console.log(`Error occur due to ${error}`);
  }
};
