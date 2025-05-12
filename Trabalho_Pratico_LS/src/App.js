import React, { useState } from "react";
import "./assets/styles/App.css";
import ControlPanel from "./components/control-panel/control-panel.component";
import GameBoard from "./components/gameboard/GameBoard.component";

function App() {
  const [opponent, setOpponent] = useState(null); // Estado para armazenar oponente

  // Função chamada ao iniciar o jogo
  const onStartGame = (selectedOpponent) => {
    setOpponent(selectedOpponent); // Armazenar o oponente selecionado
  };

  return (
    <div>
      <div id="container">
        <h2>4 em Linha</h2>
        Este é o Componente App
      </div>
      
      {/* Passa a função onStartGame como prop para o ControlPanel */}
      <ControlPanel onStartGame={onStartGame} />
      
      {/* Só renderiza o GameBoard se o oponente for selecionado */}
      {opponent && <GameBoard opponent={opponent} />}
    </div>
  );
}

export default App;
