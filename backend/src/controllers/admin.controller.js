import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import { UploadFile } from "../middlewares/uploadFile.middleware.js";
import { TryCatchHandler } from "../utils/TryCatchHandler.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Contact from "../models/contact.model.js";

// users................................................
const GetUsersAdminController = TryCatchHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    return res
      .status(404)
      .json({ message: "Users Not Found.", success: false });
  }

  return res.status(200).json({
    message: "Users Found...",
    success: true,
    data: users,
  });
});

const DeleteUsersAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Id Not Found.", success: false });
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "User Deleted Successfully.",
    success: true,
  });
});

const UpdateUsersAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;
  const { username, email, password, phone, gender, admin, birthday } =
    req.body;

  if (!id) {
    return res.status(404).json({ message: "Not Found.", success: false });
  }

  const userData = await User.findById(id);
  if (!userData) {
    return res.status(404).json({ message: "User not Found.", success: false });
  }

  await userData.updateOne({
    name: username || userData.name,
    phone: phone || userData.phone,
    birthday: birthday || userData.birthday,
    isAdmin: admin || userData.isAdmin,
    gender: gender || userData.gender,
    email: email || userData.email,
    password: password || userData.password,
  });

  await userData.save();

  if (!userData) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "User Updated Successfully.",
    success: true,
  });
});

const GetSingleUserAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not Found", success: false });
  }

  return res.status(200).json({
    message: "User found.",
    success: true,
    data: user,
  });
});

// products.............................................
const GetProductsAdminController = TryCatchHandler(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    return res
      .status(404)
      .json({ message: "Products Not Found.", success: false });
  }

  return res.status(200).json({
    message: "Products Found...",
    success: true,
    data: products,
  });
});

const DeleteProductsAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Id Not Found.", success: false });
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Product Deleted Successfully.",
    success: true,
  });
});

const CreateProductsAdminController = TryCatchHandler(async (req, res) => {
  const {
    name,
    shortDescription,
    longDescription,
    price,
    discountPrice,
    returns,
    warranty,
    deliveryPrice,
    category,
    size,
    stock,
    color,
  } = req.body;
  const file = req.files;

  if (!file || !name || !longDescription || !stock || !price || !category) {
    return res
      .status(404)
      .json({ message: "Please fill all fields.", success: false });
  }

  Promise.all(
    file.map(async (img) => {
      const urls = await UploadFile(img.path);
      return urls.url;
    })
  )
    .then(async (data) => {
      const product = await Product.create({
        name,
        shortDescription,
        longDescription,
        price,
        discountPrice,
        gallaryImages: data,
        returns,
        color: color.split(","),
        size: size.split(","),
        stock,
        category,
        warranty,
        deliveryPrice,
      });

      if (!product) {
        return res
          .status(404)
          .json({ message: "Something went wrong.", success: false });
      }

      return res.status(200).json({
        message: "Product Created Successfully.",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const UpdateProductsAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;
  const {
    name,
    shortDescription,
    longDescription,
    price,
    discountPrice,
    returns,
    warranty,
    deliveryPrice,
    category,
    stock,
    size,
    color,
  } = req.body;

  const file = req.files || [];

  if (!id) {
    return res.status(404).json({ message: "Id Not Found.", success: false });
  }

  const oldProduct = await Product.findById(id);

  let gallaryImages = oldProduct.gallaryImages;
  if (file.length > 0) {
    if (file.length > 4) {
      return res.status(400).json({
        message: "Maximum of 4 images allowed.",
        success: false,
      });
    }

    const Images = Promise.all(
      file.map(async (img) => {
        const urls = await UploadFile(img.path);
        return urls.url;
      })
    );
    gallaryImages = await Images;
  }

  const product = await Product.findByIdAndUpdate(id, {
    name: name || oldProduct.name,
    shortDescription: shortDescription || oldProduct.shortDescription,
    longDescription: longDescription || oldProduct.longDescription,
    price: price || oldProduct.price,
    discountPrice: discountPrice || oldProduct.discountPrice,
    gallaryImages,
    returns: returns || oldProduct.returns,
    stock: stock || oldProduct.stock,
    color: color.split(",") || oldProduct.color,
    size: size.split(",") || oldProduct.size,
    category: category || oldProduct.category,
    warranty: warranty || oldProduct.warranty,
    deliveryPrice: deliveryPrice || oldProduct.deliveryPrice,
  });

  if (!product) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Product Updated Successfully.",
    success: true,
  });
});

const GetSingleProductAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Id not found.", success: false });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found.", success: false });
  }

  return res.status(200).json({
    message: "Product found...",
    success: true,
    data: product,
  });
});

// coupons................................................
const GetCouponsAdminController = TryCatchHandler(async (req, res) => {
  const coupon = await Coupon.find();

  if (!coupon) {
    return res
      .status(404)
      .json({ message: "Coupon Not Found.", success: false });
  }

  return res.status(200).json({
    message: "Coupon Found...",
    success: true,
    data: coupon,
  });
});

const CreateCouponsAdminController = TryCatchHandler(async (req, res) => {
  const { code, discount, name, daysToExpire } = req.body;

  if (!code || !discount || !name || !daysToExpire) {
    return res
      .status(400)
      .json({ message: "Please fill all feilds.", success: false });
  }

  if (typeof daysToExpire !== "number" || daysToExpire <= 0) {
    return res
      .status(400)
      .json({ message: "Days to expire must be a positive number" });
  }

  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + daysToExpire);

  const coupon = await Coupon.create({
    name,
    code,
    discount,
    expire: expireDate,
  });

  if (!coupon) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Coupon created successfully.",
    success: true,
  });
});

const DeleteCouponsAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Id Not Found.", success: false });
  }

  const coupon = await Coupon.findByIdAndDelete(id);

  if (!coupon) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Coupon Deleted Successfully.",
    success: true,
  });
});

// orders............................................................
const GetOrdersAdminController = TryCatchHandler(async (req, res) => {
  const order = await Order.find();

  if (!order) {
    return res
      .status(404)
      .json({ message: "Order Not Found.", success: false });
  }

  return res.status(200).json({
    message: "Order Found...",
    success: true,
    data: order,
  });
});

const DeleteOrdersAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Id Not Found.", success: false });
  }

  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Order Deleted Successfully.",
    success: true,
  });
});

const UpdateOrderStatusAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;
  const { orderStatus } = req.body;

  if (!id || !orderStatus) {
    return res
      .status(404)
      .json({ message: "Status and id not found.", success: false });
  }

  const order = await Order.findByIdAndUpdate(id, {
    status: orderStatus,
  });

  if (!order) {
    return res
      .status(400)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Order status updated.",
    success: true,
  });
});

// contacts..............................................................
const GetContactsAdminController = TryCatchHandler(async (req, res) => {
  const contacts = await Contact.find();

  if (!contacts) {
    return res.status(400).json({
      message: "No Contacts Found!",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Contacts Found...",
    success: true,
    data: contacts,
  });
});

const DeleteContactAdminController = TryCatchHandler(async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Id Not Found.", success: false });
  }

  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    return res
      .status(404)
      .json({ message: "Something went wrong.", success: false });
  }

  return res.status(200).json({
    message: "Contact Deleted Successfully.",
    success: true,
  });
});

export {
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
  GetContactsAdminController,
  DeleteContactAdminController,
};
