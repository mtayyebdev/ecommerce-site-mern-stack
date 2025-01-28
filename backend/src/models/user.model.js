import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      default: "Other",
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    totalBuys: {
      total: {
        type: Number,
        default: 0,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    marketingSMS: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    Balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
