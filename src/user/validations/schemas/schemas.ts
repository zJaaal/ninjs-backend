import * as yup from 'yup';
import { Difficult } from '../../../utils/types';

//Schema for Register validation
export const userRegisterSchema = yup.object({
	username: yup
		.string()
		.required('Username is required')
		.min(4, 'Username should have at least 4 characters'),
	email: yup
		.string()
		.required('Email is required')
		.email('Email should be valid'),
	password: yup
		.string()
		.min(8, 'Password should have at least 8 characters')
		.required('Password is required')
		.matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./, {
			message:
				'Password should have at least 1 number, 1 Capital letter, 1 lower case letter and 8 characters'
		})
});

//Schema for Login validation
export const userLoginSchema = yup.object({
	email: yup
		.string()
		.required('Email is required')
		.email('Email should be valid'),
	password: yup
		.string()
		.min(8, 'Password should have at least 8 characters')
		.required('Password is required')
		.matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./, {
			message:
				'Password should have at least 1 number, 1 Capital letter, 1 lower case letter and 8 characters'
		})
});

export const getProgressSchema = yup.object({
	uid: yup.string().required('uid is Required')
});

export const progressSchema = yup.object({
	questionID: yup.string().required('questionID is Required'),
	difficult: yup
		.string()
		.required('difficult is Required')
		.test('difficult-validation', 'difficult should be valid', value =>
			Object.values(Difficult).includes(value as Difficult)
		),
	completed: yup.bool().required('completed is required')
	// points: yup.number().required("points is required");
});
