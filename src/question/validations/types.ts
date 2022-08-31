export type Question = {
	questionID: string;
	difficult: Difficult;
	//points: number,
	correctAnswer: string;
	img: string;
	answers: Answers;
};

export enum Difficult {
	genin = 'Genin',
	chunin = 'Chunin',
	jonin = 'Jonin'
}

export type Answers = {
	A: string;
	B: string;
	C: string;
	D: string;
};
