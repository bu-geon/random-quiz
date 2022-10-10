import { scoreState } from 'atoms/states';
import { useRecoilValue } from 'recoil';
import './scoreboard.module.css';

const Scoreboard = () => {
	const score = useRecoilValue(scoreState);

	return (
		<>
			<h1>Scoreboard</h1>
			<p>Your score</p>
			<dl>
				<dt>소요 시간</dt>
				<dd>{(score.finishTime!.getTime() - score.startTime!.getTime()) / 1000} 초</dd>
				<dt>정답 개수 [{score.corrects.join(', ')}]</dt>
				<dd>{score.corrects.length}개</dd>
				<dt>오답 개수 [{score.incorrects.join(', ')}]</dt>
				<dd>{score.incorrects.length}개</dd>
			</dl>
			<button>다시 풀기</button>
			<button>오답 노트</button>
		</>
	);
};

export default Scoreboard;
