import express from "express";
import {
  getProductsController,
  getSingleProductController,
  SearchProductsController,
  SentProductsCommentController,
  getProductReviewsController,
} from "../controllers/products.controller.js";
import { UserVerify } from "../middlewares/verify.middleware.js";
import { upload } from "../middlewares/uploadFile.middleware.js";

const ProductRouter = express.Router();

ProductRouter.route("/getproducts").get(getProductsController);
ProductRouter.route("/getsingleproduct/:id").get(getSingleProductController);
ProductRouter.route("/search").post(SearchProductsController);
ProductRouter.route("/send-comment/:id").post(
  UserVerify,
  upload.single("image"),
  SentProductsCommentController
);
ProductRouter.route("/getreviews/:id").get(
  UserVerify,
  getProductReviewsController
);

export default ProductRouter;
