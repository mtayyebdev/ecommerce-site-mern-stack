import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Order from "../models/order.model.js";
import UserInfo from "../models/userinfo.model.js";
import { UploadFile } from "../middlewares/uploadFile.middleware.js";
import { TryCatchHandler } from "../utils/TryCatchHandler.js";

const SignUpController = TryCatchHandler(async (req, res, next) => {
  const { name, email, phone, password, gender, birthday } = req.body;
  const file = req.file
    ? req.file
    : "https://cdn.pixabay.com/photo/2023/12/05/19/05/mulled-claret-8432310_640.jpg";

  if (!name || !email || !phone || !password || !gender || !birthday || !file) {
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
});

const LoginController = TryCatchHandler(async (req, res, next) => {
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

  const passExist = phoneExist.ComparePassword(password);

  if (!passExist) {
    return res.status(404).json({ message: "Invalid Phone or Password..." });
  }

  const jwtToken = await phoneExist.GenarateJWTToken();

  const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000; // 10 days

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: true, // Required for HTTPS
  sameSite: "Strict", // ya "Lax" or "None" based on frontend-backend setup
    maxAge: tenDaysInMilliseconds,
  });
console.log(jwtToken);
  return res.status(200).json({ message: "Login Successfully..." });
});

const getUserController = TryCatchHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "Inavlid User" });
  }

  return res
    .status(200)
    .json({ message: "User found successfully...", data: user });
});

const LogoutController = TryCatchHandler(async (req, res, next) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out Successfully" });
});

const updateUserController = TryCatchHandler(async (req, res, next) => {
  const { name, email, gender, birthday, phone } = req.body;

  const user = await User.findByIdAndUpdate(req.user._id, {
    name: name ? name : req.user.name,
    email: email ? email : req.user.email,
    phone: phone ? phone : req.user.phone,
    gender: gender ? gender : req.user.gender,
    birthday: birthday ? birthday : req.user.birthday,
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid User..." });
  }

  return res.status(200).json({ message: "User updated Successfully." });
});

const updateUserPasswordController = TryCatchHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(404).json({ message: "Please fill all the fields..." });
  }

  const passCorrect = await bcrypt.compare(oldPassword, req.user.password);

  if (!passCorrect) {
    return res.status(404).json({ message: "Invalid Password..." });
  }

  const rounds = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(newPassword, rounds);

  const user = await User.findByIdAndUpdate(req.user._id, {
    password: hashedPass,
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid User..." });
  }

  return res.status(200).json({ message: "Password Updated Successfully." });
});

const createUserInfoController = TryCatchHandler(async (req, res, next) => {
  const {
    country,
    zone,
    city,
    name,
    landmark,
    province,
    address,
    phoneNumber,
    addressType,
  } = req.body;

  if (
    !country ||
    !zone ||
    !city ||
    !address ||
    !phoneNumber ||
    !addressType ||
    !name ||
    !province
  ) {
    return res.status(404).json({ message: "Please fill all the fields..." });
  }

  const info = await UserInfo.create({
    country,
    address,
    city,
    phone: phoneNumber,
    zone,
    landmark,
    addressType,
    name,
    province,
    user: req.user._id,
  });

  if (!info) {
    return res.status(404).json({ message: "Invalid User..." });
  }

  return res.status(200).json({ message: "Address added Successfully." });
});

const updateUserInfoController = TryCatchHandler(async (req, res, next) => {
  const {
    country,
    zone,
    city,
    name,
    landmark,
    province,
    address,
    phoneNumber,
    addressType,
  } = req.body;
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
    addressType: addressType ? addressType : info.addressType,
    zone: zone ? zone : info.zone,
    landmark: landmark ? landmark : info.landmark,
    name: name ? name : info.name,
    province: province ? province : info.province,
    phone: phoneNumber ? phoneNumber : info.phone,
    address: address ? address : info.address,
    city: city ? city : info.city,
  });

  if (!user) {
    return res.status(404).json({ message: "Invalid User..." });
  }

  return res.status(200).json({ message: "Address Updated Successfully." });
});

const deleteUserInfoController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Invalid User..." });
  }

  const user = await UserInfo.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ message: "Invalid User..." });
  }

  return res.status(200).json({ message: "Address Deleted Successfully." });
});

const updateInfoByShippingController = TryCatchHandler(
  async (req, res, next) => {
    const id = req.params.id;

    const info = await UserInfo.updateMany(
      { user: req.user._id },
      { defaultAddress: false }
    );

    const updateInfo = await UserInfo.findByIdAndUpdate(id, {
      defaultAddress: true,
    });

    if (!updateInfo) {
      return res.status(404).json({ message: "Invalid User..." });
    }

    return res.status(200).json({ message: "Address Updated Successfully." });
  }
);

const getUserInfoController = TryCatchHandler(async (req, res, next) => {
  const user = await UserInfo.find({ user: req.user._id });

  if (!user) {
    return res.status(404).json({ message: "Info not found." });
  }

  return res
    .status(200)
    .json({ message: "UserInfo found successfully...", data: user });
});

const getSingleUserInfo = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;
  const info = await UserInfo.findOne({ user: req.user._id, _id: id });

  if (!info) {
    return res.status(404).json({ message: "Info not found." });
  }

  return res
    .status(200)
    .json({ message: "UserInfo found successfully.", data: info });
});

const createUserOrderController = TryCatchHandler(async (req, res, next) => {
  const allData = req.body;

  if (!allData) {
    return res.status(404).json({ message: "Please fill all the fields..." });
  }

  const generateNumericId = () => {
    const timestamp = Date.now().toString(); // 13 digits from current timestamp
    const randomNumber = Math.floor(Math.random() * 10 ** 7)
      .toString()
      .padStart(7, "0"); // 7 random digits
    return timestamp + randomNumber; // Combine to make a 20-digit number
  };

  const numericId = generateNumericId();

  const orderIDs = await Promise.all(
    allData.orders.map(async (order) => {
      const result = await Order.create({
        name: order.name,
        color: order.color,
        country: allData.infoData.country,
        city: allData.infoData.city,
        zone: allData.infoData.zone,
        address: allData.infoData.address,
        deliveryDate: "pending",
        image: order.image,
        phone: allData.infoData.phone,
        price: order.price * order.quantity,
        product: order.productId,
        quantity: order.quantity,
        warranty: order.guarantee,
        shippingFee: order.deliveryPrice * order.quantity,
        size: order.size,
        orderId: numericId,
        deliveryPlace: allData.infoData.addressType,
        username: allData.infoData.name,
        category: order.category,
        returns: order.returns,
        discountPrice: order.discount,
        user: req.user._id,
        paymentType: allData.paymentType,
        totalDiscount: order.totalDiscount,
        landmark: allData.infoData.landmark,
        province: allData.infoData.province,
      });

      return result;
    })
  );

  return res
    .status(200)
    .json({ message: "Order created successfully...", ids: orderIDs });
});

const getUserOrdersController = TryCatchHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return res.status(404).json({ message: "Orders not found." });
  }

  return res
    .status(200)
    .json({ message: "UserInfo found successfully...", data: order });
});

const updateOrderController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;
  const { orderStatus, paymentStatus, paymentType, shipping_fee } = req.body;

  if (!id) {
    return res.status(404).json({ message: "Invalid order id..." });
  }

  if (!orderStatus || !paymentStatus || !paymentType) {
    return res.status(404).json({ message: "No data found..." });
  }

  const oldOrder = await Order.findById(id);
  const newShippingFee = oldOrder.shippingFee + shipping_fee;

  const today = new Date();
  const tenDaysLater = new Date(today);
  tenDaysLater.setDate(today.getDate() + 10);
  const monthAndDate = tenDaysLater.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });

  const order = await Order.findByIdAndUpdate(id, {
    status: orderStatus,
    paymentStatus,
    paymentType,
    shippingFee: newShippingFee,
    deliveryDate: monthAndDate,
  });

  if (!order) {
    return res.status(404).json({ message: "Invalid order id..." });
  }

  return res.status(200).json({ message: "Order updated successfully..." });
});

const getSingleOrderController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Invalid Id..." });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: "invalid order...." });
  }

  return res.status(200).json({ message: "Order find successfully...", order });
});

const CancelOrderController = TryCatchHandler(async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Invalid Id..." });
  }

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: "invalid order...." });
  }

  order.status = "Cancelled";
  order.deliveryDate = "Cancelled";
  order.save();

  return res.status(200).json({ message: "Order Cancelled Successfully." });
});

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
  CancelOrderController,
  getSingleUserInfo,
  updateInfoByShippingController,
};
