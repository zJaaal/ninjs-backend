import { Questions } from '.';
import { Difficult } from '../../utils/types';
import Question from '../validations/models/Question';

/**
 *
 * @param questionID
 * @returns The difficult, answers and img path of the current question
 */
const findById = (questionID: string) => {
	return Question.findOne({ questionID })
		.select(['difficult', 'answers', 'code', 'question', '-_id'])
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
const list = async (page: number, difficult?: Difficult, all?: boolean) => {
	//doc.count()
	//Math.ceil(value/10)
	const mainQuery = Question.find()
		.sort({ order: 1 })
		.select(['questionID', 'difficult', '-_id']);
	if (all) {
		const count: number = difficult
			? await Question.count({ difficult }).exec()
			: await Question.count().exec();
		const data = difficult
			? await mainQuery.where({ difficult }).exec()
			: await mainQuery.exec();
		return { count, data };
	}
	if (difficult) {
		const count: number = await Question.count({ difficult }).exec();
		const data = await mainQuery
			.where({ difficult })
			.skip(page * 10)
			.limit(10)
			.exec();
		return { count, data };
	}

	const count: number = await Question.count().exec();
	const data = await mainQuery
		.skip(page * 10)
		.limit(10)
		.exec();

	return { count, data };
};

export const QuestionRepository = {
	findById,
	findAnswersById,
	list
};
