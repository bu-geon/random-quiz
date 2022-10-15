import { scoreState } from 'atoms/states';
import { useRecoilValue } from 'recoil';
import './scoreboard.module.css';

const Scoreboard = () => {
	const { finishTime, startTime, corrects, incorrects } = useRecoilValue(scoreState);

	return (
		<>
			<h1>Scoreboard</h1>
			<p>Your score</p>
			<dl>
				<dt>소요 시간</dt>
				<dd>{(finishTime!.getTime() - startTime!.getTime()) / 1000} 초</dd>
				<dt>정답 개수 [{corrects.join(', ')}]</dt>
				<dd>{corrects.length}개</dd>
				<dt>오답 개수 [{incorrects.join(', ')}]</dt>
				<dd>{incorrects.length}개</dd>
			</dl>
			<button>다시 풀기</button>
			<button>오답 노트</button>
		</>
	);
};

export default Scoreboard;
