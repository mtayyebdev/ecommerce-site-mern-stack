import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      default: 0,
    },
    discount: {
      type: String,
      required: true,
      default: 0,
    },
    deliveryPrice: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    color:String,
    size:String,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
