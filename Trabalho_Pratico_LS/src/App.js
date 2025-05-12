import React, { useState } from "react";
import "./assets/styles/App.css";
import ControlPanel from "./components/control-panel/control-panel.component";
import GameBoard from "./components/gameboard/GameBoard.component";

function App() {
  const [opponent, setOpponent] = useState(null); // Estado para armazenar o tipo de oponente (null, 1, 2)
  const [gameStarted, setGameStarted] = useState(false); // Estado para controlar se o jogo começou

  // Função para iniciar o jogo, chamada quando o botão de iniciar for clicado
  const handleStartGame = (selectedOpponent) => {
    setOpponent(selectedOpponent);
    setGameStarted(true);
  };

  return (
    <div>
      <div id="container">
        <h2>4 em Linha</h2>
        <p>Este é o Componente App</p>
      </div>
      {!gameStarted ? (
        <ControlPanel onStartGame={handleStartGame} />
      ) : (
        <GameBoard opponent={opponent} />
      )}
    </div>
  );
}

export default App;
