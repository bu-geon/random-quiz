import axios from 'axios';
import { useRecoilState } from 'recoil';
import { quizListState } from 'atoms/states';
import { useNavigate } from 'react-router-dom';

import styles from './home.module.css';
import NextButton from 'components/nextButton';

const QUIZ_API_URL = 'https://opentdb.com/api.php';

const Home = () => {
	const [, setQuizList] = useRecoilState(quizListState);
	const navigate = useNavigate();

	const handleQuizStart = async () => {
		const { data } = await axios.get(`${QUIZ_API_URL}?amount=10`);
		setQuizList(data.results);

		if (data.results) {
			navigate('/quiz');
		}
	};

	return (
		<>
			<h1>Quiz you</h1>
			<p>try 10 questions and test your knowledge.</p>
			<NextButton title="퀴즈 풀기" handleClick={handleQuizStart} />
		</>
	);
};

export default Home;
