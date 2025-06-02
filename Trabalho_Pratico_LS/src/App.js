import React, { useState } from "react";                                      // Importa o React e o hook useState para controle de estado
import GameSetup from "./components/Game-Setup/GameSetup.component";         // Importa o componente responsável pela configuração inicial do jogo
import GameBoard from "./components/gameboard/GameBoard.component";          // Importa o componente do tabuleiro do jogo
import "./assets/styles/App.css";                                            // Importa o arquivo CSS com estilos para o app

function App() {                                                             // Define o componente funcional principal da aplicação
  const [config, setConfig] = useState(null);                                // Estado para armazenar a configuração do jogo (nomes, cores etc.)

  return (                                                                   // Retorna a estrutura JSX da aplicação
    <div id="tit-container">                                                 {/* Container principal com ID para estilização */}
        <h2>4 em Linha</h2>                                                  {/* Título do jogo exibido no topo da página */}
      {!config ? (                                                           // Verifica se já existe configuração do jogo
        <GameSetup onStartGame={setConfig} />                                // Se não houver config: renderiza tela de setup, passando função para iniciar o jogo
      ) : (                                                                  // Caso contrário (já existe config):
        <GameBoard {...config} />                                            // Renderiza o tabuleiro do jogo, repassando a config como props
      )}
    </div>                                                                   // Fim da div principal
  );
}

export default App;                                                         // Exporta o componente App como padrão
