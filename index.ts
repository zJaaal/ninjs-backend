import express from "express";
import { connectMongoDB } from "./src/database";
import user from "./src/user/controller/route";

//Initialize .env
require("dotenv").config();

//Initialize express
const app = express();

//Initialize json parser
app.use(express.json());

connectMongoDB();

//Initialize app endpoints
app.use("/api/user", user); //User

//Start to listen to server port
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
