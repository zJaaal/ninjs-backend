import { UserData } from "../validations/types";
import User from "../validations/models/User";

/**
 * @description This function communicates to the database and creates an user
 * @param user
 * @returns returns the object that MongoDB generates
 */
const create = (user: UserData) => {
  const userModel = new User(user);
  userModel.save();

  return userModel;
};

/**
 * @description This function communicates to the database and finds an user by email
 * @param email
 * @returns
 */
const find = (email: string) => {
  return User.findOne({ email: email }).exec();
};

export const UserRepository = {
  create,
  find,
};
