export type UserData = {
	username: string;
	email: string;
	password: string;
	progress?: QuestionProgress[];
	variant?: Variants;
};

export type QuestionProgress = {
	questionID: string;
	difficult: string;
	completed: boolean;
	// points: number;
};

export type Profile = {
	uid: string;
	username: string;
	variant: Variants;
};

export enum Variants {
	marble = 'marble',
	beam = 'beam',
	bauhaus = 'bauhaus',
	ring = 'ring',
	sunset = 'sunset',
	pixel = 'pixel'
}
// export type Variants =
// 	| 'marble'
// 	| 'beam'
// 	| 'bauhaus'
// 	| 'ring'
// 	| 'sunset'
// 	| 'pixel';
