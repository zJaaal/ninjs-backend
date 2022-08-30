import express from "express";
import { UserController } from ".";
import { validate } from "../../middleware/validation";
import {
  userRegisterSchema,
  userLoginSchema,
} from "../validations/schemas/schemas";

const user = express.Router();
//This is the intialization of register endpoint, it validates its schema on a middleware
user.post("/", validate.schema(userRegisterSchema), UserController.register);

//This is the intialization of login endpoint, it validates its schema on a middleware
user.post("/login", validate.schema(userLoginSchema), UserController.login);

//This is the initialization of renew endpoint, it validates the JWT on a middleware
user.get("/renew", validate.jwt, UserController.renew);

export default user;
