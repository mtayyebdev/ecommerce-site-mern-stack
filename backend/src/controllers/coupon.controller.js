import Coupon from "../models/coupon.model.js";
import { TryCatchHandler } from "../utils/TryCatchHandler.js";

const getCouponController = TryCatchHandler(async (req, res, next) => {
  const { code } = req.body;

  const coupons = await Coupon.findOne({ code });

  if (!coupons) {
    return res.status(404).json({ message: "Invalid coupon code..." });
  }

  return res
    .status(200)
    .json({ message: "Coupon code applyed.", data: coupons });
});

export { getCouponController };
