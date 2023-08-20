import ProductSchema from "../Models/ProductSchema.js";
import productsData from "../Constant/ProductsData.js";
// 8956970513
const DefaultData = async (request, response) => {
    try {
        const data = await ProductSchema.insertMany(productsData);
        console.log(data);
    } catch (error) {
        response.status(404).json({ message: message.error });
    }
}

export default DefaultData;