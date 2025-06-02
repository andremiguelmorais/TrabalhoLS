import React, { useEffect } from "react";                      // Importa React e o hook useEffect para lidar com efeitos colaterais
import Confetti from "react-confetti";                         // Importa o componente Confetti para exibir animação de confetes
import "./modal.css";                                          // Importa os estilos definidos no arquivo modal.css

export default function WinnerModal({ winner, onClose }) {     // Define o componente WinnerModal, que recebe 'winner' e 'onClose' como propriedades

  useEffect(() => {                                            // Executa um efeito quando o componente é montado
    const timer = setTimeout(onClose, 5000);                   // Inicia um temporizador que chama a função onClose após 5 segundos
    return () => clearTimeout(timer);                          // Limpa o temporizador se o componente for desmontado antes dos 5 segundos
  }, [onClose]);                                               // O efeito só será recriado se a função onClose mudar

  return (                                                     // Retorna o JSX que representa o conteúdo visual do modal
    <div className="modal-overlay">                            {/* Div que cria uma camada escura/transparente sobre o conteúdo da tela */}
      <Confetti recycle={false} numberOfPieces={300} />        {/* Exibe uma animação de 300 confetes que não são reciclados após cair */}
      <div className="modal-content">                          {/* Div centralizada com o conteúdo principal do modal */}
        <h2>🎉 {winner} venceu! 🎉</h2>                       {/* Título exibindo a mensagem de vitória com o nome do vencedor */}
      </div>                                                   {/* Fim da div do conteúdo do modal */}
    </div>                                                     // Fim da div da sobreposição
  );                                                           // Fim do return
}                                                              // Fim da função WinnerModal
