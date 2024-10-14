import express from "express";
import { getCouponController } from "../controllers/coupon.controller.js";

const CouponRouter = express.Router();

CouponRouter.route("/getcoupon").post(getCouponController);

export default CouponRouter;
