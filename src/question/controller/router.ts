import express from 'express';
import { QuestionsController } from '.';
import { validate } from '../../middleware/validation';
import {
	listQuestionsSchema,
	questionIDSchema
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

export default questions;
