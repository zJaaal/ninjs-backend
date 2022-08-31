import { Difficult } from '../validations/types';
import { QuestionRepository } from './repo';

/**
 * @description This function is the validation layer of the function with the same name in repo.ts
 * @param questionID
 * @returns
 */
const findById = (questionID: string) => {
	return QuestionRepository.findById(questionID);
};

/**
 * @description This function is the validation layer of the function with the same name in repo.ts
 * @param questionID
 * @returns
 */

const findAnswersById = (questionID: string) => {
	return QuestionRepository.findAnswersById(questionID);
};

/**
 * @description This function is the validation layer of the function with the same name in repo.ts
 * @param page
 * @param difficult
 * @returns
 */
const list = (page: number, difficult?: Difficult) => {
	--page;
	return QuestionRepository.list(page, difficult);
};

export const Questions = {
	findById,
	findAnswersById,
	list
};
