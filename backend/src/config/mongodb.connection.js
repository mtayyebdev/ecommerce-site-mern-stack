import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATABASE_URL);
    console.log(
      `Database connected successfuly: ${connection.connection.host}`
    );
  } catch (error) {
    console.log("Database connection error: ", error);
    process.exit(1);
  }
};

export default ConnectDB;
