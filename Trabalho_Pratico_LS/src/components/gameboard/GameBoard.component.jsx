import React, { useState, useEffect, useRef } from "react";                                     // Importa hooks e React
import WinnerModal from "../Confetis/WinnerModal.component";                                   // Importa componente modal do vencedor
import "./game-board.css";                                                                     // Importa estilos do tabuleiro

const ROWS = 6;                                                                                 // Número de linhas do tabuleiro
const COLS = 7;                                                                                 // Número de colunas do tabuleiro
const MAX_TIME = 10;                                                                            // Tempo máximo por turno (em segundos)

function GameBoard({                                                                             // Componente GameBoard com props de configuração
  opponent,                                                                                      // Nome do oponente (não usado diretamente)
  player1Name,                                                                                   // Nome do jogador 1
  player2Name,                                                                                   // Nome do jogador 2
  player1Color,                                                                                  // Cor do jogador 1
  player2Color,                                                                                  // Cor do jogador 2
}) {

  const generateSpecialCells = (count = 5) => {                                                  // Gera células especiais aleatórias
    const setCoords = new Set();                                                                 // Conjunto para evitar coordenadas repetidas
    while (setCoords.size < count) {                                                             // Continua até gerar a quantidade desejada
      const r = Math.floor(Math.random() * ROWS);                                                // Linha aleatória
      const c = Math.floor(Math.random() * COLS);                                                // Coluna aleatória
      setCoords.add(`${r}-${c}`);                                                                // Adiciona coordenada ao conjunto
    }
    return Array.from(setCoords).map((s) => {                                                    // Converte para array de objetos {row, col}
      const [row, col] = s.split("-").map(Number);                                               // Separa e converte para número
      return { row, col };                                                                       // Retorna objeto com linha e coluna
    });
  };

  const getRandomStartingPlayer = () =>                                                          // Escolhe jogador inicial aleatoriamente
    Math.random() < 0.5                                                                          // 50% de chance para cada jogador
      ? { name: player1Name, color: player1Color }                                               // Retorna jogador 1
      : { name: player2Name, color: player2Color };                                              // Retorna jogador 2

  const [specialCells, setSpecialCells] = useState(() =>                                         // Estado das células especiais
    generateSpecialCells()                                                                       // Inicializa com células aleatórias
  );
  const [board, setBoard] = useState(                                                            // Estado do tabuleiro
    Array(ROWS).fill().map(() => Array(COLS).fill(null))                                         // Cria matriz 6x7 com valores nulos
  );
  const [currentPlayer, setCurrentPlayer] = useState(                                            // Estado do jogador atual
    getRandomStartingPlayer()                                                                    // Inicializa com jogador aleatório
  );
  const [gameOver, setGameOver] = useState(false);                                               // Estado de fim de jogo
  const [highlightedCol, setHighlightedCol] = useState(null);                                    // Coluna destacada ao passar o mouse
  const [timeElapsed, setTimeElapsed] = useState(0);                                             // Tempo decorrido do turno
  const [winner, setWinner] = useState(null);                                                    // Armazena o vencedor

  const timerRef = useRef(null);                                                                 // Referência ao timer (intervalo)

  useEffect(() => {                                                                              // Efeito que reinicia o timer a cada turno
    clearInterval(timerRef.current);                                                             // Limpa o timer anterior
    setTimeElapsed(0);                                                                           // Reinicia contador

    if (!gameOver) {                                                                             // Se o jogo não acabou
      timerRef.current = setInterval(() => {                                                     // Cria novo intervalo
        setTimeElapsed((prev) => {                                                               // Atualiza tempo a cada segundo
          if (prev + 1 >= MAX_TIME) {                                                            // Se tempo acabou
            clearInterval(timerRef.current);                                                     // Para o timer
            setCurrentPlayer((p) =>                                                              // Alterna jogador atual
              p.color === player1Color
                ? { name: player2Name, color: player2Color }
                : { name: player1Name, color: player1Color }
            );
            return 0;                                                                            // Reinicia tempo para próximo turno
          }
          return prev + 1;                                                                       // Incrementa tempo
        });
      }, 1000);                                                                                   // A cada 1 segundo
    }

    return () => clearInterval(timerRef.current);                                                // Limpa o timer ao desmontar ou alterar
  }, [currentPlayer, gameOver,player1Color, player1Name, player2Color, player2Name]);                                                                 // Dependências: jogador ou fim do jogo

  const resetGame = () => {                                                                      // Função para reiniciar o jogo
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));                              // Reseta o tabuleiro
    setCurrentPlayer(getRandomStartingPlayer());                                                 // Escolhe novo jogador inicial
    setGameOver(false);                                                                          // Reinicia estado de fim de jogo
    setHighlightedCol(null);                                                                     // Remove destaque da coluna
    setWinner(null);                                                                             // Remove vencedor
    setSpecialCells(generateSpecialCells());                                                     // Gera novas células especiais
  };

  const handleColumnClick = (colIndex) => {                                                      // Trata clique em uma coluna
    if (gameOver) return;                                                                        // Ignora se jogo terminou
    for (let row = ROWS - 1; row >= 0; row--) {                                                  // Percorre de baixo para cima
      if (!board[row][colIndex]) {                                                               // Se célula estiver vazia
        const newBoard = board.map((r) => [...r]);                                               // Cria cópia do tabuleiro
        newBoard[row][colIndex] = currentPlayer.color;                                           // Marca célula com cor do jogador
        setBoard(newBoard);                                                                      // Atualiza o estado do tabuleiro

        checkForWinner(newBoard, row, colIndex);                                                 // Verifica se houve vencedor

        const isSpecial = specialCells.some(                                                     // Verifica se célula é especial
          (cell) => cell.row === row && cell.col === colIndex
        );

        if (!isSpecial) {                                                                        // Se não for especial, troca de jogador
          setCurrentPlayer((p) =>
            p.color === player1Color
              ? { name: player2Name, color: player2Color }
              : { name: player1Name, color: player1Color }
          );
        } else {
          console.log("⭐ Bônus: joga de novo!");                                                 // Loga mensagem bônus
          // Jogador mantém a vez (não troca)
        }

        break;                                                                                    // Sai do loop após colocar peça
      }
    }
  };

  const checkForWinner = (newBoard, row, col) => {                                               // Verifica se houve vitória
    const dirs = [                                                                               // Direções possíveis para checagem
      [0, 1],                                                                                     // Horizontal
      [1, 0],                                                                                     // Vertical
      [1, 1],                                                                                     // Diagonal \
      [1, -1],                                                                                    // Diagonal /
    ];
    if (dirs.some(([dx, dy]) => checkDirection(newBoard, row, col, dx, dy))) {                   // Verifica cada direção
      setGameOver(true);                                                                         // Finaliza o jogo
      setWinner(currentPlayer.name);                                                             // Define o vencedor
    }
  };

  const checkDirection = (board, row, col, dx, dy) => {                                          // Verifica peças iguais em uma direção
    let count = 1;                                                                               // Contador de peças iguais
    for (let dir of [1, -1]) {                                                                   // Verifica nas duas direções
      for (let i = 1; i < 4; i++) {                                                              
        const r = row + i * dx * dir;                                                            // Nova linha
        const c = col + i * dy * dir;                                                            // Nova coluna
        if (
          r >= 0 && r < ROWS &&
          c >= 0 && c < COLS &&
          board[r][c] === currentPlayer.color                                                    // Mesma cor do jogador
        ) {
          count++;                                                                               // Incrementa contador
        } else break;                                                                            // Para se for diferente
      }
    }
    return count >= 4;                                                                           // Retorna se houve 4 ou mais seguidas
  };

  const handleMouseMove = (e) => {                                                               // Atualiza coluna destacada com mouse
    const rect = e.currentTarget.getBoundingClientRect();                                        // Pega dimensões do tabuleiro
    const x = e.clientX - rect.left;                                                             // Posição X do mouse relativa ao tabuleiro
    const colWidth = rect.width / COLS;                                                          // Largura de cada coluna
    setHighlightedCol(Math.floor(x / colWidth));                                                 // Define coluna com base na posição X
  };

  const getColorStyle = (c) => {                                                                 // Retorna a cor de estilo do token
    switch (c) {
      case "🔴": return "red";                                                                   // Vermelho
      case "🟡": return "yellow";                                                                // Amarelo
      case "🔵": return "blue";                                                                  // Azul
      default: return c || "gray";                                                               // Cor padrão (vazio)
    }
  };

  return (                                                                                       // Renderização do componente
    <div>
      {winner && (                                                                               // Exibe modal se houver vencedor
        <WinnerModal winner={winner} onClose={() => setWinner(null)} />
      )}

      <div className="game-info">                                                                {/* Informações do jogo */}
        {gameOver
          ? `Jogo encerrado - Vencedor: ${winner}`                                               // Mensagem de fim de jogo
          : `${currentPlayer.name} (${currentPlayer.color}) - Tempo: ${timeElapsed}s`}          {/* Jogador atual e tempo restante */}
      </div>

      <div className="game-board" onMouseMove={handleMouseMove}>                                 {/* Área do tabuleiro */}
        {board.map((rowArr, r) => (                                                              // Mapeia linhas
          <div key={r} className="board-row">                                                    {/* Linha do tabuleiro */}
            {rowArr.map((cell, c) => {                                                           // Mapeia colunas
              const isSpecial = specialCells.some(                                               // Verifica se célula é especial
                (cell) => cell.row === r && cell.col === c
              );
              return (
                <div
                  key={c}
                  className={[
                    "board-cell",                                                                // Classe base
                    highlightedCol === c && "highlighted",                                       // Destaque
                    gameOver && "disabled",                                                      // Desativa se fim de jogo
                    isSpecial && "special",                                                      // Marca como especial
                  ].filter(Boolean).join(" ")}                                                   // Junta as classes válidas
                  onClick={() => handleColumnClick(c)}                                           // Clique para jogar
                  onDragOver={(e) => e.preventDefault()}                                         // Suporte a drop
                  onDrop={() => handleColumnClick(c)}                                            // Drop para jogar
                  style={{ color: cell ? getColorStyle(cell) : undefined }}                     // Cor da peça
                >
                  {cell}                                                                         {/* Mostra peça (emoji) */}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {gameOver && (                                                                             // Se o jogo acabou, mostra botões
        <div className="game-over-button">
          <button onClick={resetGame}>Reiniciar Jogo</button>                                   {/* Botão para reiniciar */}
          <button
            className="back-button"
            onClick={() => (window.location.href = "/")}                                        // Voltar para a página inicial
          >
            🏠 Página Inicial
          </button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;                                                                       // Exporta componente GameBoard
