import React, { useState } from 'react';
import './control.css';

function ControlPanel({ onStartGame }) {
  const [opponent, setOpponent] = useState('0'); // '0' para sem escolha, '1' para Jogador, '2' para BOT

  const handleStart = () => {
    if (opponent === '0') {
      alert('Por favor, selecione um oponente!');
    } else {
      onStartGame(opponent); // Passa o tipo de oponente para o jogo
    }
  };

  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha o seu oponente</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Opções:</label>
          <select
            id="btLevel"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          >
            <option value="0">Seleccione...</option>
            <option value="1">Jogador</option>
            <option value="2">BOT</option>
          </select>
        </fieldset>
        <button type="button" id="btPlay" onClick={handleStart}>
          Iniciar Jogo
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
      </div>
    </section>
  );
}

export default ControlPanel;