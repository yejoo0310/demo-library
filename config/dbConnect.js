import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const dbConnect = async () => {
  try {
    console.log(process.env.DB_CONNECT);
    const connect = await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB connected v ^_______^ v");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
