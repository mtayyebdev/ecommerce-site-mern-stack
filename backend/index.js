import express, { json, urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import ConnectDB from "./src/config/mongodb.connection.js";
import cookieParser from "cookie-parser";
import Coupon from "./src/models/coupon.model.js";
import cron from "node-cron";
import ErrorHandling from "./src/utils/errorHandling.middleware.js";

// routers.............................................
import AuthRouter from "./src/routers/auth.route.js";
import CartRouter from "./src/routers/cart.route.js";
import ProductRouter from "./src/routers/products.route.js";
import CouponRouter from "./src/routers/coupon.route.js";
// import AdminRouter from "./src/routers/admin.route.js";

const app = express();
ConnectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(json({ limit: "16kb" }));
app.use(urlencoded({ limit: "16kb" }));

cron.schedule("0 0 * * *", async () => {
  // Run this job daily at midnight
  try {
    const expiredCoupons = await Coupon.find({ expire: { $lt: new Date() } });
    for (const coupon of expiredCoupons) {
      await coupon.deleteOne();
    }
    console.log("Expired coupons deleted");
  } catch (error) {
    console.error("Error deleting expired coupons:", error);
  }
});

// routes.......................................
app.use("/api/auth", AuthRouter);
app.use("/api/cart", CartRouter);
app.use("/api/product", ProductRouter);
app.use("/api/coupon", CouponRouter);
// app.use("/api/admin", AdminRouter);

app.use(ErrorHandling);

// app listning........................................
app.listen(process.env.PORT, () => {
  console.log(`Server is running port: ${process.env.PORT}`);
});
