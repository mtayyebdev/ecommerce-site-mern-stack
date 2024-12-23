import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    image: String,
    name: String,
    quantity: Number,
    price: Number,
    shippingFee: Number,
    discountPrice: Number,
    category: String,
    returns: String,
    username: String,
    phone: String,
    address: String,
    color: String,
    country: String,
    city: String,
    totalDiscount: {
      type: Number,
      default: 0,
    },
    zipCode: String,
    deliveryDate: String,
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Pending",
    },
    paymentType: {
      type: String,
      required: true,
      default: "None",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    created_date: {
      type: String,
      default: new Date().toLocaleString(),
    },
    size: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
