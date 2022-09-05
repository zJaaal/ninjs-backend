import { Request, Response } from 'express';
import { Users } from '../../user/domain';
import { Difficult } from '../../utils/types';
import { Questions } from '../domain';

/**
 * @description This controllers search in DB a question by ID
 * @param req
 * @param res
 * @returns
 */
const findById = async (req: Request, res: Response) => {
	try {
		const question = await Questions.findById(req.query.questionID as string);
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

/**
 * @description This controllers fetch with pagination and filtering all questions
 * @param req
 * @param res
 * @returns
 */
const list = async (req: Request, res: Response) => {
	try {
		//Here i should get the user progress to merge it
		const questions = await Questions.list(
			Number(req.query.page),
			req.query.difficult as Difficult
		);
		if (!questions.length) {
			return res.status(404).json({
				status: 'Error',
				ErrorMessage: "Couldn't find any questions"
			});
		}

		const userProgress = await Users.getProgress(req.query.uid as string);
		if (!userProgress?.progress?.length) {
			return res.status(200).json({
				status: 'Completed',
				result: questions
			});
		}
		const mergeArrays = questions.map(
			data =>
				userProgress.progress?.find(
					question => data.questionID == question.questionID
				) || data
		);
		res.status(200).json({
			status: 'Completed',
			result: mergeArrays
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: 'Error',
			ErrorMessage: 'Something went wrong please contact an admin'
		});
	}
};

/**
 * @description This controllers review your answer to a question and saves your progress
 * @param req
 * @param res
 * @returns
 */
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

		const progressResult = await Users.getProgress(req.body.uid);
		console.log(progressResult);
		if (
			progressResult?.progress?.find(x => x.questionID == question.questionID)
		) {
			await Users.updateProgress(req.body.uid, question.questionID, result);
			console.log('updated');
		} else {
			console.log('pushed');
			await Users.pushProgress(
				req.body.uid,
				question.questionID,
				question.difficult,
				result
			);
		}

		res.status(200).json({
			status: 'Completed',
			result: {
				correct: result,
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
