import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expire: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

couponSchema.index({expire: 1}, {expireAfterSeconds: 0})

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
