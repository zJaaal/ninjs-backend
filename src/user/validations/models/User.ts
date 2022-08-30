import mongoose from "mongoose";
import { QuestionProgress, UserData } from "../types";

//Mongo Model

const QuestionProgress = new mongoose.Schema<QuestionProgress>({
  questionID: { type: String, unique: true },
  difficult: { type: String },
  completed: { type: Boolean },
  points: { type: Number },
});

const User = new mongoose.Schema<UserData>({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  progress: {
    type: [QuestionProgress],
  },
});

export default mongoose.model<UserData>("User", User);
