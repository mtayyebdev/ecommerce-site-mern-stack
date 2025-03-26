import express, { json, urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import ConnectDB from "./src/config/mongodb.connection.js";
import cookieParser from "cookie-parser";
import ErrorHandling from "./src/utils/errorHandling.middleware.js";

// routers.............................................
import AuthRouter from "./src/routers/auth.route.js";
import CartRouter from "./src/routers/cart.route.js";
import ProductRouter from "./src/routers/products.route.js";
import CouponRouter from "./src/routers/coupon.route.js";
import AdminRouter from "./src/routers/admin.route.js";
import ContactRouter from "./src/routers/contact.route.js";

const app = express();
ConnectDB().catch((err) => {
  console.log("Database error: ", err);
  process.exit(1);
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(json({ limit: "16kb" }));
app.use(urlencoded({ limit: "16kb" }));

// routes.......................................
app.use("/api/auth", AuthRouter);
app.use("/api/cart", CartRouter);
app.use("/api/product", ProductRouter);
app.use("/api/coupon", CouponRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/contact", ContactRouter);

app.use(ErrorHandling);

// app listning........................................
app.listen(process.env.PORT, () => {
  console.log(`Server is running port: ${process.env.PORT}`);
});
