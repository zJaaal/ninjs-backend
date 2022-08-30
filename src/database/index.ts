import mongoose from "mongoose";
/**
 * @description This function initialize the mongo connection.
 */
export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN || "");
    console.log("DB is Online");
  } catch (error) {
    console.log(error);
    throw new Error("An error occured while connecting to the Database");
  }
};
