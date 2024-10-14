import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    image: String,
    name: String,
    quantity: String,
    price: String,
    shippingFee: String,
    discountPrice:String,
    category:String,
    returns:String,
    username: String,
    phone: String,
    address: String,
    color: String,
    deliveryDate: String,
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    createdDate: new Date().toLocaleString(),
    size: String,
    warranty: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
