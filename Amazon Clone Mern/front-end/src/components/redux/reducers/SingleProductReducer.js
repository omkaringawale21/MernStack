const product = [];

const SingleProductReducer = (state = { product }, action) => {
    switch (action.type) {
        case "SUCCESS_GET_SINGLE_PRODUCT":
            return { product: action.payload }
        case "FAIL_GET_SINGLE_PRODUCT":
            return { product: action.payload }
        default: return state;
    }
}

export default SingleProductReducer;