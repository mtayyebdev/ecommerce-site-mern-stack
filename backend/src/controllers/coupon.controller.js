import Coupon from "../models/coupon.model.js";

const getCouponController = async (req, res, next) => {
  try {
    const { code } = req.body;
    const coupons = await Coupon.findOne({ code });

    if (!coupons) {
      return res.status(404).json({ message: "Invalid coupon code..." });
    }

    return res
      .status(200)
      .json({ message: "Coupon code applyed.", data: coupons });
  } catch (error) {
    next(error);
  }
};

export{getCouponController}
