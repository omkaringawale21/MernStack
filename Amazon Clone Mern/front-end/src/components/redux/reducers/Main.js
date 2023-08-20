import { ProductsReducer } from "./ProductsReducer";
import { combineReducers } from "redux";
import SingleProductReducer from "./SingleProductReducer";

const rootReducers = combineReducers({
    getproductdata: ProductsReducer,
    getsingleproductdata: SingleProductReducer
});

export default rootReducers;