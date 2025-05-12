import React, { useState, useEffect } from "react";
import "./game-board.css";

const ROWS = 6;
const COLS = 7;

function GameBoard({ opponent }) {
  const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('🔴');
  const [gameOver, setGameOver] = useState(false);

  // Função para reiniciar o jogo
  const resetGame = () => {
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
    setCurrentPlayer('🔴');
    setGameOver(false);
  };

  // Função chamada ao clicar em uma coluna
  const handleColumnClick = (colIndex) => {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][colIndex]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][colIndex] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === '🔴' ? '🟡' : '🔴');
        checkForWinner(newBoard, row, colIndex);
        break;
      }
    }
  };

  // Função para verificar se alguém ganhou
  const checkForWinner = (newBoard, row, col) => {
    if (checkDirection(newBoard, row, col, 0, 1) || // Horizontal (direita)
        checkDirection(newBoard, row, col, 0, -1) || // Horizontal (esquerda)
        checkDirection(newBoard, row, col, 1, 0) || // Vertical (para baixo)
        checkDirection(newBoard, row, col, 1, 1) || // Diagonal crescente
        checkDirection(newBoard, row, col, 1, -1)) { // Diagonal decrescente
      setGameOver(true);
      alert(`${currentPlayer} venceu!`);
      return;
    }
  };

  // Função para verificar uma direção específica
  const checkDirection = (board, row, col, rowDir, colDir) => {
    let count = 1;
    
    // Verifica uma direção (horizontal, vertical ou diagonal)
    for (let i = 1; i < 4; i++) {
      const r = row + i * rowDir;
      const c = col + i * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    // Verifica a direção oposta
    for (let i = 1; i < 4; i++) {
      const r = row - i * rowDir;
      const c = col - i * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
      } else {
        break;
      }
    }

    return count >= 4; // Se tiver 4 peças consecutivas
  };

  // Função para o bot jogar automaticamente
  const botPlay = () => {
    if (gameOver || currentPlayer === '🔴') return; // O bot só joga quando for a vez dele (🟡)

    let colIndex = -1;
    // Bot escolhe a primeira coluna disponível
    for (let col = 0; col < COLS; col++) {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
          colIndex = col;
          break;
        }
      }
      if (colIndex !== -1) break;
    }

    // Faz a jogada do bot
    if (colIndex !== -1) {
      handleColumnClick(colIndex);
    }
  };

  // Se o oponente for um bot, ele joga automaticamente após o jogador humano
  useEffect(() => {
    if (opponent === '2' && currentPlayer === '🟡') {
      const timeout = setTimeout(() => {
        botPlay();
      }, 500); // Delay para dar tempo de ver a jogada do jogador
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, opponent, board]);

  return (
    <div>
      <div className="game-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row" style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleColumnClick(colIndex)}
                className="board-cell"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: '#1e3a8a',
                  border: '2px solid white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  cursor: gameOver ? 'not-allowed' : 'pointer',
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Exibe o botão de reiniciar quando o jogo terminar */}
      {gameOver && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={resetGame}>Reiniciar Jogo</button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
