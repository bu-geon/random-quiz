import { scoreState } from 'atoms/states';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import './scoreboard.module.css';

import { PATH } from 'App';

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
			<Link to={`../${PATH.quiz}`}>
				<button>다시 풀기</button>
			</Link>
			<button>오답 노트</button>
		</>
	);
};

export default Scoreboard;
