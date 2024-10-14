import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const UserVerify = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ message: "Unauthorized user..." });
    }

    const user = await jwt.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(404).json({ message: "Unauthorized user..." });
    }

    const verifiedUser = await User.findOne({ _id: user.id });

    req.user = verifiedUser;
    req.userId = verifiedUser._id;

    next();
  } catch (error) {
    next(error);
  }
};

const AdminVerify = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      return res.status(404).json({ message: "Unauthorized user..." });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export { UserVerify, AdminVerify };
