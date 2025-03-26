import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    gallaryImages: {
      type: [],
      required: true,
    },
    returns: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
    deliveryPrice: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    solds: {
      type: Number,
      default: 0,
    },
    size: Array,
    color: Array,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
