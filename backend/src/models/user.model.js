import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      default: "Other",
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    totalBuys: {
      total: {
        type: Number,
        default: 0,
      },
      products: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    marketingSMS: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    Balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("Password hashing error: ", error);
  }
});

userSchema.methods.ComparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return error;
  }
};

userSchema.methods.GenarateJWTToken = function () {
  try {
    return jwt.sign(
      {
        id: this._id,
        phoneId: this.phone,
        emailId: this.email,
        admin: this.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    return error;
  }
};

const User = mongoose.model("User", userSchema);
export default User;
