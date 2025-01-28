import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { TryCatchHandler } from "../utils/TryCatchHandler.js";

const getCartController = TryCatchHandler(async (req, res, next) => {
  const carts = await Cart.find({ user: req.user._id });

  if (!carts) {
    return res.status(404).json({ message: "Not found." });
  }

  return res.status(200).json({ message: "Carts found.", data: carts });
});

const deleteCartController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;
  const carts = await Cart.findByIdAndDelete(id);

  if (!carts) {
    return res.status(404).json({ message: "Not found." });
  }

  return res.status(200).json({ message: "Cart Deleted Successfully." });
});

const deleteAllCartsController = TryCatchHandler(async (req, res, next) => {
  const carts = await Cart.deleteMany({ user: req.user._id });

  if (!carts) {
    return res.status(404).json({ message: "Not found." });
  }

  return res.status(200).json({ message: "Carts Deleted Successfully." });
});

const updateCartController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(404).json({ message: "Quantity not found." });
  }

  const cart = await Cart.findById(id);

  if (!cart) {
    return res.status(404).json({ message: "Not found." });
  }

  const findProduct = await Product.findById(cart.product);

  cart.price = quantity * findProduct.price;
  cart.deliveryPrice = quantity * findProduct.deliveryPrice;
  cart.quantity = quantity;
  await cart.save();

  return res.status(200).json({ message: "Cart Updated Successfully." });
});

const createCartController = TryCatchHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Invalid Path..." });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found..." });
  }

  const totalPrice = quantity * product.price;
  const totalDeliveryPrice = quantity * product.deliveryPrice;

  const cart = await Cart.create({
    name: product.name,
    image: product.frontImage,
    price: totalPrice,
    discount: product.discountPrice,
    deliveryPrice: totalDeliveryPrice,
    product: product._id,
    user: req.user._id,
    color: product.color,
    size: product.size,
    category: product.category,
    guarantee: product.warranty,
    quantity,
  });

  if (!cart) {
    return res.status(404).json({ message: "Error..." });
  }

  return res.status(200).json({ message: "Cart Added Successfully." });
});

export {
  getCartController,
  createCartController,
  deleteCartController,
  updateCartController,
  deleteAllCartsController,
};
