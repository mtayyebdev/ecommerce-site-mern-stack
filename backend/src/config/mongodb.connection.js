import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    if (connection) {
      console.log("Database connected successfuly...");
    } else {
      console.log("Database connection error...");
    }
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};

export default ConnectDB