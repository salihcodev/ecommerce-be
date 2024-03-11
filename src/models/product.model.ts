import mongoose from "mongoose";
const { Schema } = mongoose;

export const productsSchema = new Schema({
    name: String,
    id: String,
});

const products = mongoose.model("products", productsSchema);
export default products;
