import styles from './nextButton.module.css';

interface Props {
	title: string;
	handleClick: () => void;
}

const NextButton = ({ title, handleClick }: Props) => {
	return (
		<button className={styles.quizStart} onClick={handleClick}>
			{title}
		</button>
	);
};

export default NextButton;
