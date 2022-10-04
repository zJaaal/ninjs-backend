import { Difficult } from '../../utils/types';

export type Question = {
	questionID: string;
	question: string;
	code: string;
	correctAnswer: string;
	explanation: string;
	difficult: Difficult;
	//points: number,
	answers: Answers;
	order: number;
};

export type Answers = {
	A: string;
	B: string;
	C: string;
	D: string;
};
