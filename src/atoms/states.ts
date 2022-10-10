import { atom } from 'recoil';

export interface QuizList {
	category: string;
	correct_answer: string;
	incorrect_answers: string[];
	question: string;
}

export const quizListState = atom<QuizList[]>({
	key: 'quizListState',
	default: [],
});

interface Score {
	startTime: Date | undefined;
	finishTime: Date | undefined;
	corrects: number[];
	incorrects: number[];
}

export const scoreState = atom<Score>({
	key: 'userAnswersState',
	default: {
		startTime: undefined,
		finishTime: undefined,
		corrects: [],
		incorrects: [],
	},
});
