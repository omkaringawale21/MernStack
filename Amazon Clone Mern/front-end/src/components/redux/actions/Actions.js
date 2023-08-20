const URL = "http://localhost:8000";

export const getProducts = () => async (dispatch) => {
    try {
        const data = await fetch(`${URL}/getproducts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        const response = await data.json();
        dispatch({
            type: "SUCCESS_GET_PRODUCTS",
            payload: response,
        });
    } catch (error) {
        dispatch({
            type: "FAIL_GET_PRODUCTS",
            payload: error.response,
        });
    }
}