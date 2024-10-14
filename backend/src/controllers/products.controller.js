import Product from "../models/product.model.js";

const getProductsController = async (req, res, next) => {
  try {
    const product = await Product.find();

    if (!product) {
      return res.status(404).json({ message: "Products not found.." });
    }

    return res
      .status(200)
      .json({ message: "Products found successfully.", data: product });
  } catch (error) {
    next(error);
  }
};

const getSingleProductController = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found.." });
    }

    return res
      .status(200)
      .json({ message: "Product found successfully.", data: product });
  } catch (error) {
    next(error);
  }
};

export {getProductsController,getSingleProductController}
