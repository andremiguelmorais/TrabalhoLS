import React, { useState } from 'react';                          // Importa React e o hook useState do pacote 'react'.
import './control.css';                                           // Importa o arquivo CSS para estilização do componente.

function ControlPanel({ onStartGame }) {                          // Declara a função ControlPanel que recebe onStartGame como prop.
  const [opponent, setOpponent] = useState('0');                  // Declara o estado 'opponent' inicializado com '0' (nenhum oponente selecionado).

  const handleStart = () => {                                     // Declara a função handleStart para tratar o início do jogo.
    if (opponent === '0') {                                       // Verifica se nenhum oponente foi selecionado (valor '0').
      alert('Por favor, selecione um oponente!');                 // Exibe um alerta pedindo para selecionar um oponente.
    } else {                                                      // Caso contrário, chama a função onStartGame com o oponente selecionado.
      onStartGame(opponent);                                      // Chama onStartGame passando o oponente escolhido.
    }
  };

  return (
    <section id="panel-control">                       {/* Renderiza a seção principal com o id 'panel-control'. */}
      <h3 className="sr-only">Escolha o seu oponente</h3> {/* Renderiza um título de nível 3 com classe para acessibilidade. */}
      <form className="form">                          {/* Renderiza um formulário com classe 'form'. */}
        <fieldset className="form-group">              {/* Renderiza um conjunto de campos (fieldset) com classe 'form-group'. */}
          <label htmlFor="btLevel">Opções:</label>    {/* Renderiza um label associado ao select com htmlFor 'btLevel'. */}
          <select
            id="btLevel"                                        // Atributo id do select para referência no label.
            value={opponent}                                    // Define o valor do select como o estado opponent.
            onChange={(e) => setOpponent(e.target.value)}       // Atualiza o estado quando o valor mudar.
          >
            <option value="0">Seleccione...</option>  {/* Opção com valor '0' para instruir a seleção. */}
            <option value="1">Jogador</option>        {/* Opção com valor '1' representando o jogador humano. */}
            <option value="2">BOT</option>            {/* Opção com valor '2' representando o BOT. */}
          </select>
        </fieldset>
        <button type="button" id="btPlay" onClick={handleStart}> {/* Botão para iniciar o jogo. */}
          Iniciar Jogo
        </button>
      </form>
      <div className="form-metadata">                   {/* Renderiza uma div para metadados com classe 'form-metadata'. */}
        <p id="message" role="alert" className="hide"> {/* Parágrafo com mensagem para o usuário, inicialmente oculto. */}
          Clique em Iniciar o Jogo!
        </p>
      </div>
    </section>
  );
}

export default ControlPanel;                                    // Exporta o componente ControlPanel como padrão.
