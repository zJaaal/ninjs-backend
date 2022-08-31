import mongoose from 'mongoose';
import { Question } from '../types';

const Question = new mongoose.Schema<Question>({
	questionID: {
		type: String,
		unique: true
	},
	difficult: {
		type: String,
		enum: ['Genin', 'Chunin', 'Jonin']
	},
	// points: {
	// 	type: Number
	// },
	correctAnswer: {
		type: String,
		enum: ['A', 'B', 'C', 'D']
	},
	img: {
		type: String
	},
	answers: {
		A: {
			type: String
		},
		B: {
			type: String
		},
		C: {
			type: String
		},
		D: {
			type: String
		}
	}
});

export default mongoose.model<Question>('Question', Question);
