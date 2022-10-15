import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import './App.css';

import Home from './routes/home';
import Quiz from './routes/quiz';
import Scoreboad from './routes/scoreboard';

export const PATH = {
	quiz: 'quiz',
	scoreboad: 'scoreboard',
};

function App() {
	return (
		<RecoilRoot>
			<div className="App">
				<main>
					<Routes>
						<Route index element={<Home />} />
						<Route path={PATH.quiz} element={<Quiz />} />
						<Route path={PATH.scoreboad} element={<Scoreboad />} />
						<Route path="*" element={<div>Page Not Found</div>} />
					</Routes>
				</main>
			</div>
		</RecoilRoot>
	);
}

export default App;
