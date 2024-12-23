import express from "express";
import { UserVerify } from "../middlewares/verify.middleware.js";
import {
  createCartController,
  deleteCartController,
  getCartController,
  updateCartController,
  deleteAllCartsController,
} from "../controllers/cart.controller.js";

const CartRouter = express.Router();

CartRouter.route("/createcart/:id").post(UserVerify, createCartController);
CartRouter.route("/deletecart/:id").delete(UserVerify, deleteCartController);
CartRouter.route("/getcart").get(UserVerify, getCartController);
CartRouter.route("/deletecarts").delete(UserVerify, deleteAllCartsController);
CartRouter.route("/updatecart/:id").patch(UserVerify, updateCartController);

export default CartRouter;
