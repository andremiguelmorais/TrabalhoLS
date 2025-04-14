import React from "react";
import "./control-panel.css";
function ControlPanel() {
  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha o seu oponente</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Opções:</label>
          <select id="btLevel">
            <option value="0">Seleccione...</option>
            <option value="1">Jogador</option>
            <option value="2">BOT</option>
            
          </select>
        </fieldset>
        <button type="button" id="btPlay">
          Iniciar Jogo
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
        <dl className="list-item left">
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">0s</dd>
        </dl>
         {/* Este é um comentário JSX 
          <dl className="list-item right">
          <dt>Pontuação TOP:</dt>
          <dd id="pointsTop">0</dd>
        </dl>
            
        <dl className="list-item left">
          <dt>Pontuação:</dt>
          <dd id="points">0</dd>
        </dl>
        <div id="top10" className="right">
          <button id="btTop">Ver TOP 10</button>
        </div> 
            */}
      </div>
    </section>
  );
}

export default ControlPanel;
