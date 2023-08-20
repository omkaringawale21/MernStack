import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: {
        shortTitle: String,
        longTitle: String
    },
    price: {
        mrp: Number,
        cost: Number,
        discount: String
    },
    description: String,
    discount: String,
    tagline: String
});

const productsCollection = mongoose.model("products", productsSchema);

export default productsCollection;