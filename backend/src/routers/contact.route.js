import express from "express";
import { UserVerify } from "../middlewares/verify.middleware.js";
import { CreateContactController } from "../controllers/contact.controller.js";
import { upload } from "../middlewares/uploadFile.middleware.js";

const ContactRouter = express.Router();

ContactRouter.route("/createcontact").post(
  UserVerify,
  upload.single("image"),
  CreateContactController
);

export default ContactRouter;
