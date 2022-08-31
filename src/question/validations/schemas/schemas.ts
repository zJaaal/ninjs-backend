import * as yup from 'yup';
import { Difficult } from '../../../utils/types';

export const questionSchema = yup.object({
	questionID: yup.string().required('questionID is Required'),
	difficult: yup
		.string()
		.required('difficult is Required')
		.test('difficult-validation', 'difficult should be valid', value =>
			Object.values(Difficult).includes(value as Difficult)
		),
	correctAnswer: yup.string().required('correctAnswer is Required'),
	img: yup.string().required('img is required'),
	answers: yup.object({
		A: yup.string().required('A answer is required'),
		B: yup.string().required('B answer is required'),
		C: yup.string().required('C answer is required'),
		D: yup.string().required('D answer is required')
	}),
	explanation: yup.string().required('explanation is required')
	//points: number,
});

export const questionIDSchema = yup.object({
	questionID: yup.string().required('questionID is required')
});

export const listQuestionsSchema = yup.object({
	uid: yup.string(),
	page: yup
		.number()
		.required('page is Required')
		.typeError('page is not a valid number')
		.min(1, 'page should be at least 1'),
	difficult: yup
		.string()
		.optional()
		.test(
			'difficult-validation',
			'difficult should be a valid difficult',
			value =>
				value ? Object.values(Difficult).includes(value as Difficult) : true
		)
});

export const reviewSchema = yup.object({
	questionID: yup.string().required('questionID is required'),
	uid: yup.string(),
	answer: yup.string().required('answer is required')
});
