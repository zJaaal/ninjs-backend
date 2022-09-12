import mongoose from 'mongoose';
import { string } from 'yup';
import { QuestionProgress, UserData } from '../types';

//Mongo Model

const QuestionProgress = new mongoose.Schema<QuestionProgress>(
	{
		questionID: { type: String },
		difficult: { type: String },
		completed: { type: Boolean }
		// points: { type: Number },
	},
	{ _id: false }
);

const User = new mongoose.Schema<UserData>({
	username: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	progress: {
		type: [QuestionProgress]
	},
	variant: {
		type: String,
		default: 'marble'
	}
});

export default mongoose.model<UserData>('User', User);
