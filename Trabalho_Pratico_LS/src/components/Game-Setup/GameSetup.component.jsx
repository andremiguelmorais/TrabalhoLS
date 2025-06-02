import React, { useState } from "react";                    // Importa React e o hook useState
import "./gamesetup.css";                                   // Importa o CSS para estilizar o componente

function GameSetup({ onStartGame }) {                       // Componente principal GameSetup
  const [opponent, setOpponent] = useState("1");           // Estado: tipo de oponente ("1" jogador, "2" BOT)
  const [player1Name, setPlayer1Name] = useState("Jogador 1");  // Estado: nome do jogador 1
  const [player2Name, setPlayer2Name] = useState("Jogador 2");  // Estado: nome do jogador 2
  const [player1Color, setPlayer1Color] = useState("🔴");       // Estado: cor do jogador 1
  const [player2Color, setPlayer2Color] = useState("🟡");       // Estado: cor do jogador 2

  const handleStart = () => {                               // Função que inicia o jogo
    if (opponent === "2") setPlayer2Name("BOT");           // Se oponente for BOT, nome fixo "BOT"
    onStartGame({                                          // Chama onStartGame com os dados
      opponent,                                          
      player1Name,
      player2Name: opponent === "2" ? "BOT" : player2Name,
      player1Color,
      player2Color,
    });
  };

  return (
    <div className="game-setup-container" style={{ padding: "20px" }}>
      {/* Contêiner principal da configuração */}

      <h2>Configuração do Jogo</h2>                          {/* Título */}

      <label className="label-opponent">Oponente:</label>  {/* Label oponente */}

      <select
        className="select-opponent"                         /* Dropdown para escolher oponente */
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
      >
        <option value="1">Outro Jogador</option>           {/* Jogador humano */}
        <option value="2">BOT</option>                      {/* BOT */}
      </select>

      <div className="player-setup player1">                 {/* Setup jogador 1 */}
        <h3>Jogador 1</h3>

        <input
          type="text"
          className="input-player-name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          placeholder="Nome Jogador 1"
        />

        <select
          className="select-player-color"
          value={player1Color}
          onChange={(e) => setPlayer1Color(e.target.value)}
        >
          <option value="🔴">Vermelho (🔴)</option>
          <option value="🟡">Amarelo (🟡)</option>
          <option value="🔵">Azul (🔵)</option>
        </select>
      </div>

      {opponent === "1" && (                                  /* Só mostra jogador 2 se oponente for humano */
        <div className="player-setup player2">
          <h3>Jogador 2</h3>

          <input
            type="text"
            className="input-player-name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Nome Jogador 2"
          />

          <select
            className="select-player-color"
            value={player2Color}
            onChange={(e) => setPlayer2Color(e.target.value)}
          >
            <option value="🟡">Amarelo (🟡)</option>
            <option value="🔴">Vermelho (🔴)</option>
            <option value="🔵">Azul (🔵)</option>
          </select>
        </div>
      )}

      <button className="btn-start" onClick={handleStart}>    {/* Botão iniciar jogo */}
        Iniciar Jogo
      </button>
    </div>
  );
}

export default GameSetup;                                   // Exporta o componente
