import { TryCatchHandler } from "../utils/TryCatchHandler.js";
import Contact from "../models/contact.model.js";
import { UploadFile } from "../middlewares/uploadFile.middleware.js";

const CreateContactController = TryCatchHandler(async (req, res) => {
  const { name, email, orderNumber, reason, message } = req.body;
  const file = req.file;

  if (!name || !email || !message || !reason) {
    return res.status(400).json({
      message: "Please fill all fields.",
      success: false,
    });
  }

  if (!file) {
    const contact = await Contact.create({
      name,
      email,
      message,
      reason,
      orderNumber: orderNumber || null,
    });

    if (!contact) {
      return res.status(400).json({
        message: "Something went wrong.",
        success: false,
      });
    }
  } else {
    const image = await UploadFile(file.path);

    const contact = await Contact.create({
      name,
      email,
      message,
      reason,
      orderNumber: orderNumber || null,
      image: image.url || null,
    });

    if (!contact) {
      return res.status(400).json({
        message: "Something went wrong.",
        success: false,
      });
    }
  }

  return res.status(200).json({
    message: "Message sended...",
    success: true,
  });
});

export { CreateContactController };
