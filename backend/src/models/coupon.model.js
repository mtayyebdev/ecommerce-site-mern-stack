import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    },
    expire: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 1728000 } // 20 days in seconds
    }
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
