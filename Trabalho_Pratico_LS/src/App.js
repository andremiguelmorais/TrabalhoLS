import React, { useState } from "react";
import "./assets/styles/App.css";
import GameSetup from "./components/Game-Setup/GameSetup.component";
import GameBoard from "./components/gameboard/GameBoard.component";

function App() {
  const [gameConfig, setGameConfig] = useState(null);

  // Quando o jogo começar, salva as configurações
  const handleStartGame = (config) => {
    setGameConfig(config);
  };

  return (
    <div>
      <div id="container">
        <h2>4 em Linha</h2>
        <p>Este é o Componente App</p>
      </div>

      {!gameConfig ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard
          opponent={gameConfig.opponent}
          player1Name={gameConfig.player1Name}
          player2Name={gameConfig.player2Name}
          player1Color={gameConfig.player1Color}
          player2Color={gameConfig.player2Color}
        />
      )}
    </div>
  );
}

export default App;