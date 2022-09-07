import { Difficult } from '../../utils/types';
import Question from '../validations/models/Question';

/**
 *
 * @param questionID
 * @returns The difficult, answers and img path of the current question
 */
const findById = (questionID: string) => {
	return Question.findOne({ questionID })
		.select(['difficult', 'answers', 'img', '-_id'])
		.exec();
};

/**
 *
 * @param questionID
 * @returns The answers and util info of a question
 */

const findAnswersById = (questionID: string) => {
	return Question.findOne({ questionID })
		.select(['correctAnswer', 'difficult', 'questionID', 'explanation', '-_id'])
		.exec();
};

/**
 *
 * @param page
 * @param difficult
 * @returns all questions filtered by difficult and page or all questions
 */
const list = (page: number, difficult?: Difficult, all?: boolean) => {
	const mainQuery = Question.find().select(['questionID', 'difficult', '-_id']);
	if (all)
		return difficult ? mainQuery.where({ difficult }).exec() : mainQuery.exec();

	if (difficult)
		return mainQuery
			.where({ difficult })
			.skip(page * 10)
			.limit(10)
			.exec();

	return mainQuery
		.skip(page * 10)
		.limit(10)
		.exec();
};

export const QuestionRepository = {
	findById,
	findAnswersById,
	list
};
