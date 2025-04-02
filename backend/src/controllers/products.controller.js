import Product from "../models/product.model.js";
import { TryCatchHandler } from "../utils/TryCatchHandler.js";
import { UploadFile } from "../middlewares/uploadFile.middleware.js";
import ProductReview from "../models/products.review.model.js";

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

const SearchProductsController = TryCatchHandler(async (req, res) => {
  const { s } = req.query;
  const data = req.body;

  if (!s) {
    return res.status(400).json({
      message: "Search query is required.",
      success: false,
    });
  }

  const filterConditions = {};

  if (data.filtercolors.length > 0) {
    filterConditions.color = {
      $in: data.filtercolors,
    };
  }

  if (data.minPrice || data.maxPrice) {
    filterConditions.price = {};
    if (data.minPrice) {
      filterConditions.price.$gte = parseInt(data.minPrice);
    }
    if (data.maxPrice) {
      filterConditions.price.$lte = parseInt(data.maxPrice);
    }
  }

  const pipeline = [
    {
      $match: {
        $or: [
          { name: { $regex: s, $options: "i" } },
          { category: { $regex: s, $options: "i" } },
        ],
      },
    },
  ];

  if (Object.keys(filterConditions).length > 0) {
    pipeline.push({ $match: filterConditions });
  }
  if (data.filterLimit) {
    pipeline.push({ $limit: data.filterLimit });
  }
  if (data.filterSkip) {
    pipeline.push({ $skip: data.filterSkip });
  }
  if (data.filterFormat) {
    pipeline.push({ $sort: { price: parseInt(data.filterFormat) } });
  }

  let products = await Product.aggregate(pipeline);

  return res.status(200).json({
    message: "Products found...",
    success: true,
    data: products,
  });
});

const SentProductsCommentController = TryCatchHandler(async (req, res) => {
  const product_id = req.params.id;
  const { message, rating } = req.body;
  const file = req.file;

  if (!product_id) {
    return res
      .status(400)
      .json({ message: "Product not found.", success: false });
  }

  if (!message || !rating) {
    return res
      .status(400)
      .json({ message: "Comment not found.", success: false });
  }

  let uploadedImage = "";
  if (file) {
    const img = await UploadFile(file.path);
    uploadedImage = img?.url;
  }

  const comment = await ProductReview.create({
    name: req.user.name,
    message,
    image: uploadedImage,
    rating,
    product: product_id,
    user: req.user._id,
  });

  if (!comment) {
    return res
      .status(400)
      .json({ message: "Something wrong.", success: false });
  }

  return res.status(200).json({
    message: "Comment Sended.",
    success: true,
  });
});

const getProductReviewsController = TryCatchHandler(async (req, res) => {
  const Product_id = req.params.id;

  const comments = await ProductReview.find({ product: Product_id });

  return res.status(200).json({
    message: "Comments found.",
    success: true,
    data: comments,
  });
});

export {
  getProductsController,
  getSingleProductController,
  SearchProductsController,
  SentProductsCommentController,
  getProductReviewsController,
};
