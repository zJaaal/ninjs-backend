import mongoose from 'mongoose';
import { number } from 'yup';
import { Question } from '../types';

const Question = new mongoose.Schema<Question>({
	questionID: {
		type: String,
		unique: true
	},
	question: {
		type: String
	},
	code: {
		type: String
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
	},
	explanation: {
		type: String
	},
	order: {
		type: Number
	}
});

export default mongoose.model<Question>('Question', Question);
