import {
  GetUsersAdminController,
  GetProductsAdminController,
  DeleteProductsAdminController,
  DeleteUsersAdminController,
  UpdateUsersAdminController,
  CreateProductsAdminController,
  UpdateProductsAdminController,
  CreateCouponsAdminController,
  GetCouponsAdminController,
  DeleteCouponsAdminController,
  GetOrdersAdminController,
  DeleteOrdersAdminController,
  GetSingleUserAdminController,
  GetSingleProductAdminController,
  UpdateOrderStatusAdminController,
  DeleteContactAdminController,
  GetContactsAdminController,
} from "../controllers/admin.controller.js";
import express from "express";
import { upload } from "../middlewares/uploadFile.middleware.js";
import { AdminVerify, UserVerify } from "../middlewares/verify.middleware.js";

const AdminRouter = express.Router();

// products...........................................
AdminRouter.route("/createproduct").post(
  UserVerify,
  AdminVerify,
  upload.array("images", 4),
  CreateProductsAdminController
);
AdminRouter.route("/updateproduct/:id").patch(
  UserVerify,
  AdminVerify,
  upload.array("images", 4),
  UpdateProductsAdminController
);
AdminRouter.route("/deleteproduct/:id").delete(
  UserVerify,
  AdminVerify,
  DeleteProductsAdminController
);
AdminRouter.route("/getproducts").get(
  UserVerify,
  AdminVerify,
  GetProductsAdminController
);
AdminRouter.route("/getproduct/:id").get(
  UserVerify,
  AdminVerify,
  GetSingleProductAdminController
);

// users...................................................
AdminRouter.route("/getusers").get(
  UserVerify,
  AdminVerify,
  GetUsersAdminController
);
AdminRouter.route("/updateuser/:id").patch(
  UserVerify,
  AdminVerify,
  UpdateUsersAdminController
);
AdminRouter.route("/deleteuser/:id").delete(
  UserVerify,
  AdminVerify,
  DeleteUsersAdminController
);
AdminRouter.route("/getuser/:id").get(
  UserVerify,
  AdminVerify,
  GetSingleUserAdminController
);

// coupons..................................................
AdminRouter.route("/getcoupons").get(
  UserVerify,
  AdminVerify,
  GetCouponsAdminController
);
AdminRouter.route("/deletecoupon/:id").delete(
  UserVerify,
  AdminVerify,
  DeleteCouponsAdminController
);
AdminRouter.route("/createcoupon").post(
  UserVerify,
  AdminVerify,
  CreateCouponsAdminController
);

// orders.................................................
AdminRouter.route("/getorders").get(
  UserVerify,
  AdminVerify,
  GetOrdersAdminController
);
AdminRouter.route("/deleteorder/:id").delete(
  UserVerify,
  AdminVerify,
  DeleteOrdersAdminController
);
AdminRouter.route("/updateorderstatus/:id").patch(
  UserVerify,
  AdminVerify,
  UpdateOrderStatusAdminController
);

//contacts....................................................
AdminRouter.route("/getcontacts").get(
  UserVerify,
  AdminVerify,
  GetContactsAdminController
);
AdminRouter.route("/deletecontact/:id").delete(
  UserVerify,
  AdminVerify,
  DeleteContactAdminController
);

export default AdminRouter;
