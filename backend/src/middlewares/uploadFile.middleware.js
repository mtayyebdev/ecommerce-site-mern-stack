import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadFile = async (files) => {
  try {
    const file = await cloudinary.uploader.upload(files, {
      folder: "MERN-Stack-E-commerce",
    });
    if (!file) {
      return null;
    }
    return file;
  } catch (error) {
    console.log("Cloudinary error :", error);
  }
};

export { upload, UploadFile };
