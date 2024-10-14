import express from "express";
import {
  getProductsController,
  getSingleProductController,
} from "../controllers/products.controller.js";

const ProductRouter = express.Router();

ProductRouter.route("/getproducts").get(getProductsController);
ProductRouter.route("/getsingleproduct/:id").get(getSingleProductController);

export default ProductRouter;
