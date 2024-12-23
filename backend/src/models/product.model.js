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
    frontImage: {
      type: String,
      required: true,
    },
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
    return: {
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
      total: {
        type: String,
        default: 0,
      },
      comment: [],
    },
    category: {
      type: String,
      required: true,
    },
    solds: {
      type: String,
      default: 0,
    },
    size: String,
    color: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
