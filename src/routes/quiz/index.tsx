import { MouseEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';

import styles from './quiz.module.css';

import { quizListState, scoreState } from 'atoms/states';
import NextButton from 'components/nextButton';

const Quiz = () => {
	const [quizIndex, setQuizIndex] = useState(0);
	const quizList = useRecoilValue(quizListState);
	const { category, correct_answer, incorrect_answers, question } = quizList[quizIndex];
	const answers = [correct_answer, ...incorrect_answers].sort();
	const [score, setScore] = useRecoilState(scoreState);

	const [isAnswerSelected, setIsAnswerSelected] = useState(false);

	const navigate = useNavigate();

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		if (isAnswerSelected) return;

		if (e.currentTarget.value === correct_answer) {
			e.currentTarget.className += ` ${styles.correct}`;
			setScore({
				startTime: score.startTime,
				finishTime: score.finishTime,
				corrects: [...score.corrects, quizIndex],
				incorrects: score.incorrects,
			});
		} else {
			e.currentTarget.className += ` ${styles.incorrect}`;
			setScore({
				startTime: score.startTime,
				finishTime: score.finishTime,
				corrects: score.corrects,
				incorrects: [...score.incorrects, quizIndex],
			});
		}

		setIsAnswerSelected(true);
	};

	const handleNext = () => {
		setIsAnswerSelected(false);

		setScore({
			startTime: score.startTime,
			finishTime: new Date(),
			corrects: score.corrects,
			incorrects: score.incorrects,
		});

		if (quizIndex === 9) {
			navigate('/scoreboard');
		}
		setQuizIndex((prev) => prev + 1);
	};

	useEffect(() => {
		setScore({
			startTime: new Date(),
			finishTime: score.finishTime,
			corrects: score.corrects,
			incorrects: score.incorrects,
		});
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
					<button className={styles.answer} key={answer} value={answer} onClick={handleClick}>
						{answer}
					</button>
				))}
			</div>
			{isAnswerSelected && <NextButton title="다음 문항" handleClick={handleNext} />}
		</>
	);
};

export default Quiz;
