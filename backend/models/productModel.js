import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    sideImage: { type: String, required: true },
    dimension: { type: String, required: true },
    scheme: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceMontaza: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
