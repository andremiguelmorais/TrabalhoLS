import React from "react";                                                  // Importa a biblioteca React, necessária para criar componentes React
import ReactDOM from "react-dom/client";                                    // Importa o módulo para renderizar o app na DOM usando a nova API do React 18
import App from "./App";                                                    // Importa o componente principal da aplicação (App)
import "./assets/styles/index.css";                                         // Importa os estilos globais da aplicação a partir do arquivo CSS

const root = ReactDOM.createRoot(                                           // Cria uma raiz para renderizar a aplicação React
  document.getElementById("root")                                           // Obtém o elemento HTML com o ID 'root' onde o app será montado
);

root.render(                                                                // Renderiza o conteúdo React dentro da raiz criada acima
  <React.StrictMode>                                                        {/* Envolve a aplicação com React.StrictMode para ativar verificações e avisos adicionais*/}
    <App />                                                                 {/* Renderiza o componente App dentro do modo estrito */}
                                                                            {/* Isso ajuda a identificar problemas potenciais no código */}
  </React.StrictMode>
);
