import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Order from "../models/order.model.js";
import UserInfo from "../models/userinfo.model.js";
import { UploadFile } from "../middlewares/uploadFile.middleware.js";
import { v4 as uuidv4 } from "uuid";

const SignUpController = async (req, res, next) => {
  try {
    const { name, email, phone, password, gender, birthday } = req.body;
    const file = req.file
      ? req.file
      : "https://cdn.pixabay.com/photo/2023/12/05/19/05/mulled-claret-8432310_640.jpg";

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !birthday ||
      !file
    ) {
      return res.status(404).json({
        message: "Please fill all the fields...",
      });
    }

    const userExist = await User.findOne({ phone });

    if (userExist) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    const rounds = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, rounds);

    const image = file.path ? await UploadFile(file.path) : "";

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      avatar: image.url ? image.url : file,
      gender,
      birthday,
      phone,
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({
      message: "Signup Successfully...",
    });
  } catch (error) {
    next(error);
  }
};

const LoginController = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(404).json({
        message: "Please fill all the fields...",
      });
    }

    const phoneExist = await User.findOne({ phone });

    if (!phoneExist) {
      return res.status(404).json({ message: "Invalid Phone or Password..." });
    }

    const passExist = await bcrypt.compare(password, phoneExist.password);

    if (!passExist) {
      return res.status(404).json({ message: "Invalid Phone or Password..." });
    }

    const jwtToken = jwt.sign(
      {
        id: phoneExist._id,
        phoneId: phoneExist.phone,
        emailId: phoneExist.email,
        admin: phoneExist.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days

    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: tenDaysInMilliseconds,
    });

    return res.status(200).json({ message: "Login Successfully..." });
  } catch (error) {
    next(error);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "Inavlid User" });
    }

    return res
      .status(200)
      .json({ message: "User found successfully...", data: user });
  } catch (error) {
    next(error);
  }
};

const LogoutController = async (req, res, next) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out Successfully" });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { name, email, gender, birthday, phone } = req.body;
    const file = req.file;

    const image = await UploadFile(file.path);

    const user = await User.findByIdAndUpdate(req.user._id, {
      name: name ? name : req.user.name,
      email: email ? email : req.user.email,
      phone: phone ? phone : req.user.phone,
      gender: gender ? gender : req.user.gender,
      birthday: birthday ? birthday : req.user.birthday,
      avatar: image.url ? image.url : req.user.avatar,
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({ message: "User updated Successfully." });
  } catch (error) {
    next(error);
  }
};

const updateUserPasswordController = async (req, res, next) => {
  try {
    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res.status(404).json({ message: "Please fill all the fields..." });
    }

    const passCorrect = await bcrypt.compare(oldpassword, req.user.password);

    if (!passCorrect) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    const rounds = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newpassword, rounds);

    const user = await User.findByIdAndUpdate(req.user._id, {
      password: hashedPass,
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({ message: "Password updated Successfully." });
  } catch (error) {
    next(error);
  }
};

const createUserInfoController = async (req, res, next) => {
  try {
    const { country, zipcode, city, address, phone } = req.body;

    if (!country || !zipcode || !city || !address || !phone) {
      return res.status(404).json({ message: "Please fill all the fields..." });
    }

    const user = await UserInfo.create({
      country,
      address,
      city,
      phone,
      zipCode: zipcode,
      user: req.user._id,
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({ message: "Address added Successfully." });
  } catch (error) {
    next(error);
  }
};

const updateUserInfoController = async (req, res, next) => {
  try {
    const { country, zipcode, city, address, phone } = req.body;
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    const info = await UserInfo.findById(id);

    if (!info) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    const user = await UserInfo.findByIdAndUpdate(id, {
      country: country ? country : info.country,
      zipCode: zipcode ? zipcode : info.zipCode,
      phone: phone ? phone : info.phone,
      address: address ? address : info.address,
      city: city ? city : info.city,
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({ message: "Address Updated Successfully." });
  } catch (error) {
    next(error);
  }
};

const deleteUserInfoController = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    const user = await UserInfo.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({ message: "Address Deleted Successfully." });
  } catch (error) {
    next(error);
  }
};

const getUserInfoController = async (req, res, next) => {
  try {
    const user = await UserInfo.find({ user: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "UserInfo found successfully...", data: user });
  } catch (error) {
    next(error);
  }
};

const createUserOrderController = async (req, res, next) => {
  try {
    const allData = req.body;

    if (!allData) {
      return res.status(404).json({ message: "Please fill all the fields..." });
    }

    const uuid = uuidv4();
    const numericUuid = uuid.replace("/-/g", "");

    const today = new Date();
    const tenDaysLater = new Date(today);
    tenDaysLater.setDate(today.getDate() + 10);
    const monthAndDate = tenDaysLater.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
    });

    const orderIDs = await Promise.all(
      allData.orders.map(async (order) => {
        const result = await Order.create({
          name: order.name,
          color: order.color,
          country: allData.userdata.country,
          city: allData.userdata.city,
          zipCode: allData.userdata.zipcode,
          address: allData.userdata.address,
          deliveryDate: monthAndDate,
          image: order.image,
          phone: allData.userdata.phone,
          price: order.price,
          product: order.productId,
          quantity: order.quantity,
          shippingFee: order.deliveryPrice,
          size: order.size,
          orderId: numericUuid,
          username: allData.userdata.username,
          category: order.category,
          returns: order.guarantee,
          discountPrice: order.discount,
          user: req.user._id,
          paymentType: allData.paymentType,
          totalDiscount: order.totalDiscount,
        });

        return result;
      })
    );

    return res
      .status(200)
      .json({ message: "Order created successfully...", ids: orderIDs });
  } catch (error) {
    next(error);
  }
};

const getUserOrdersController = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Orders not found." });
    }

    return res
      .status(200)
      .json({ message: "UserInfo found successfully...", data: order });
  } catch (error) {
    next(error);
  }
};

const updateOrderController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { orderStatus, paymentStatus, paymentType, shipping_fee } = req.body;

    if (!id) {
      return res.status(404).json({ message: "Invalid order id..." });
    }

    const oldOrder = await Order.findById(id);
    const newShippingFee = oldOrder.shippingFee + shipping_fee;

    const order = await Order.findByIdAndUpdate(id, {
      status: orderStatus,
      paymentStatus,
      paymentType,
      shippingFee: newShippingFee,
    });

    if (!order) {
      return res.status(404).json({ message: "Invalid order id..." });
    }

    return res.status(200).json({ message: "Order updated successfully..." });
  } catch (error) {
    next(error);
  }
};

const getSingleOrderController = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({ message: "Invalid Id..." });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "invalid order...." });
    }

    return res
      .status(200)
      .json({ message: "Order find successfully...", order });
  } catch (error) {
    next(error);
  }
};

export {
  SignUpController,
  LoginController,
  LogoutController,
  getUserController,
  getUserInfoController,
  createUserInfoController,
  deleteUserInfoController,
  updateUserController,
  createUserOrderController,
  updateUserInfoController,
  updateUserPasswordController,
  getUserOrdersController,
  updateOrderController,
  getSingleOrderController,
};
