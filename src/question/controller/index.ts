import { Request, Response } from 'express';
import { Questions } from '../domain';

const findById = async (req: Request, res: Response) => {
	try {
		const question = await Questions.findById(req.body.questionID);
		if (!question) {
			return res.status(404).json({
				status: 'Error',
				ErrorMessage: "Couldn't find any question by that id"
			});
		}
		res.status(200).json({
			status: 'Completed',
			result: question
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Error',
			ErrorMessage: 'Something went wrong please contact an admin'
		});
	}
};

const list = async (req: Request, res: Response) => {
	try {
		//Here i should get the user progress to merge it
		const questions = await Questions.list(req.body.page, req.body.difficult);
		if (!questions.length) {
			return res.status(404).json({
				status: 'Error',
				ErrorMessage: "Couldn't find any questions"
			});
		}
		res.status(200).json({
			status: 'Completed',
			result: questions
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Error',
			ErrorMessage: 'Something went wrong please contact an admin'
		});
	}
};
const review = async (req: Request, res: Response) => {
	try {
		const question = await Questions.findAnswersById(req.body.questionID);
		if (!question) {
			return res.status(404).json({
				status: 'Error',
				ErrorMessage: "Couldn't find any question"
			});
		}

		const result = question.correctAnswer == req.body.answer;

		//Here i should make the request to post progress to User Model

		res.status(200).json({
			status: 'Completed',
			result: {
				correct: result,
				uid: req.body.uid,
				explanation: question.explanation
			}
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Error',
			ErrorMessage: 'Something went wrong please contact an admin'
		});
	}
};
export const QuestionsController = {
	findById,
	list,
	review
};
