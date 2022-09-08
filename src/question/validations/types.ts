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
};

export type Answers = {
	A: string;
	B: string;
	C: string;
	D: string;
};
