// src/components/GameSetup.jsx
import React, { useState } from "react";
import "./gamesetup.css";

function GameSetup({ onStartGame }) {
  const [opponent, setOpponent] = useState("1"); // '1' jogador, '2' bot
  const [player1Name, setPlayer1Name] = useState("Jogador 1");
  const [player2Name, setPlayer2Name] = useState("Jogador 2");
  const [player1Color, setPlayer1Color] = useState("🔴");
  const [player2Color, setPlayer2Color] = useState("🟡");

  const handleStart = () => {
    if (opponent === "2") setPlayer2Name("BOT");
    onStartGame({
      opponent,
      player1Name,
      player2Name: opponent === "2" ? "BOT" : player2Name,
      player1Color,
      player2Color,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Configuração do Jogo</h2>
      <label>Oponente:</label>
      <select value={opponent} onChange={(e) => setOpponent(e.target.value)}>
        <option value="1">Outro Jogador</option>
        <option value="2">BOT</option>
      </select>

      <div>
        <h3>Jogador 1</h3>
        <input
          type="text"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          placeholder="Nome Jogador 1"
        />
        <select
          value={player1Color}
          onChange={(e) => setPlayer1Color(e.target.value)}
        >
          <option value="🔴">Vermelho (🔴)</option>
          <option value="🟡">Amarelo (🟡)</option>
          <option value="🔵">Azul (🔵)</option>
        </select>
      </div>

      {opponent === "1" && (
        <div>
          <h3>Jogador 2</h3>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Nome Jogador 2"
          />
          <select
            value={player2Color}
            onChange={(e) => setPlayer2Color(e.target.value)}
          >
            <option value="🟡">Amarelo (🟡)</option>
            <option value="🔴">Vermelho (🔴)</option>
            <option value="🔵">Azul (🔵)</option>
          </select>
        </div>
      )}

      <button onClick={handleStart}>Iniciar Jogo</button>
    </div>
  );
}

export default GameSetup;
