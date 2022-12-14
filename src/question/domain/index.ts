import { Difficult } from '../../utils/types';
import { QuestionRepository } from './repo';

/**
 *
 * @param questionID
 * @returns The difficult, answers and img path of the current question
 */
const findById = (questionID: string) => {
	return QuestionRepository.findById(questionID);
};

/**
 *
 * @param questionID
 * @returns The answers and util info of a question
 */

const findAnswersById = (questionID: string) => {
	return QuestionRepository.findAnswersById(questionID);
};

/**
 *
 * @param page
 * @param difficult
 * @returns all questions filtered by difficult and page or all questions
 */
const list = (page: number, difficult?: Difficult, all?: boolean) => {
	--page;
	return QuestionRepository.list(page, difficult, all);
};

/**
 * @returns the count of every difficult
 */
const count = () => {
	return QuestionRepository.count();
};

export const Questions = {
	findById,
	findAnswersById,
	list,
	count
};
