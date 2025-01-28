import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    country: String,
    zone: String,
    city: String,
    address: String,
    phone: String,
    landmark: String,
    province: String,
    addressType: String,
    name: String,
    defaultAddress: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);
export default UserInfo;
