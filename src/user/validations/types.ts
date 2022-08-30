export type UserData = {
  username: string;
  email: string;
  password: string;
  progress?: QuestionProgress[];
};

export type QuestionProgress = {
  questionID: string;
  difficult: string;
  completed: boolean;
  points: number;
};
