import express from 'express';
import { QuestionsController } from '.';
import { validate } from '../../middleware/validation';
import {
	listQuestionsSchema,
	questionIDSchema,
	reviewSchema
} from '../validations/schemas/schemas';

const questions = express.Router();

questions.get(
	'/find',
	validate.schema(questionIDSchema),
	QuestionsController.findById
);
questions.get(
	'/list',
	validate.schema(listQuestionsSchema),
	QuestionsController.list
);
questions.get(
	'/review',
	validate.schema(reviewSchema),
	QuestionsController.review
);

export default questions;
