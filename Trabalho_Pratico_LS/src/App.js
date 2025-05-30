import React, { useState } from "react";
import GameSetup from "./components/Game-Setup/GameSetup.component";
import GameBoard from "./components/gameboard/GameBoard.component";
import "./assets/styles/App.css";

function App() {
  const [config, setConfig] = useState(null);

  return (
    <div id="container">
      <h2>4 em Linha</h2>
      {!config ? (
        <GameSetup onStartGame={setConfig} />
      ) : (
        <GameBoard {...config} />
      )}
    </div>
  );
}

export default App;