import { MouseEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import classNames from 'classnames/bind';

import styles from './quiz.module.css';

import { quizListState, scoreState } from 'atoms/states';
import NextButton from 'components/nextButton';
import { PATH } from 'App';

const cn = classNames.bind(styles);

const Quiz = () => {
	const [quizIndex, setQuizIndex] = useState(0);
	const quizList = useRecoilValue(quizListState);
	const { category, correct_answer, incorrect_answers, question } = quizList[quizIndex];
	const answers = [correct_answer, ...incorrect_answers].sort();
	const [score, setScore] = useRecoilState(scoreState);

	const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);

	const navigate = useNavigate();

	const handleAnswerClick = (e: MouseEvent<HTMLButtonElement>) => {
		setSelectedAnswer(e.currentTarget.value);

		if (e.currentTarget.value === correct_answer) {
			// e.currentTarget.className += ` ${styles.correct}`;
			setScore({ ...score, corrects: [...score.corrects, quizIndex + 1] });
		} else {
			// e.currentTarget.className += ` ${styles.incorrect}`;
			setScore({ ...score, incorrects: [...score.incorrects, quizIndex + 1] });
		}
	};

	const handleNext = () => {
		if (quizIndex === 9) {
			setScore({ ...score, finishTime: new Date() });
			navigate(`/${PATH.scoreboad}`);
		}

		setSelectedAnswer(undefined);
		setQuizIndex((prev) => prev + 1);
	};

	useEffect(() => {
		setScore({ ...score, startTime: new Date() });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h3>{category}</h3>
			<h3>Question {quizIndex + 1} of 10</h3>
			<h1>{decode(question)}</h1>
			<p>Select an answer</p>
			<div className={styles.answers__container}>
				{answers.map((answer) => (
					<button
						className={cn('answer', {
							notSolved: selectedAnswer === undefined,
							correct: selectedAnswer === answer && selectedAnswer === correct_answer,
							incorrect: selectedAnswer === answer && selectedAnswer !== correct_answer,
						})}
						key={answer}
						value={answer}
						onClick={handleAnswerClick}
						disabled={selectedAnswer !== undefined}
					>
						{answer}
					</button>
				))}
			</div>
			{selectedAnswer !== undefined && <NextButton title="다음 문항" handleClick={handleNext} />}
		</>
	);
};

export default Quiz;
