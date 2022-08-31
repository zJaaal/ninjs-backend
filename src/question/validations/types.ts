import { Difficult } from '../../utils/types';

export type Question = {
	questionID: string;
	difficult: Difficult;
	//points: number,
	correctAnswer: string;
	img: string;
	answers: Answers;
	explanation: string;
};

export type Answers = {
	A: string;
	B: string;
	C: string;
	D: string;
};
