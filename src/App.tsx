import GamePage from './View/GamePage/GamePage'
import Login from './View/Login/Login'
import ScoreBoard from './View/ScoreBoard/ScoreBoard'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from 'react';



function App() {

  const isGameSessionStarted = window.sessionStorage.getItem("isGameSessionStarted");
  const [gameStarted, SetGameStarted] = useState(() => isGameSessionStarted)


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={gameStarted ? <Navigate replace to="/gamepage" /> : <Login SetGameStarted={SetGameStarted} />} />
          <Route path="gamepage" element={gameStarted ? <GamePage /> : <Navigate replace to="/login" />} />
          <Route path="scoreboard" element={<ScoreBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


