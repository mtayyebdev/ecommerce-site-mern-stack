import Product from "../models/product.model.js";
import { TryCatchHandler } from "../utils/TryCatchHandler.js";

const getProductsController = TryCatchHandler(async (req, res, next) => {
  const product = await Product.find();

  if (!product) {
    return res.status(404).json({ message: "Products not found.." });
  }

  return res
    .status(200)
    .json({ message: "Products found successfully.", data: product });
});

const getSingleProductController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found.." });
  }

  return res
    .status(200)
    .json({ message: "Product found successfully.", data: product });
});

export { getProductsController, getSingleProductController };
