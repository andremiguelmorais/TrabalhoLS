import React, { useState, useEffect } from "react";
import "./game-board.css";

const ROWS = 6;
const COLS = 7;

function GameBoard({ opponent, player1Name, player2Name, player1Color, player2Color }) {
  // Inicia com player aleatório
  const getRandomStartingPlayer = () => {
    return Math.random() < 0.5
      ? { name: player1Name, color: player1Color }
      : { name: player2Name, color: player2Color };
  };

  const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState(getRandomStartingPlayer());
  const [gameOver, setGameOver] = useState(false);
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const resetGame = () => {
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
    setCurrentPlayer(getRandomStartingPlayer());
    setGameOver(false);
    setHighlightedCol(null);
    setTimeElapsed(0);
  };

  const handleColumnClick = (colIndex) => {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][colIndex]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][colIndex] = currentPlayer.color;
        setBoard(newBoard);
        checkForWinner(newBoard, row, colIndex);
        setCurrentPlayer(currentPlayer.color === player1Color
          ? { name: player2Name, color: player2Color }
          : { name: player1Name, color: player1Color });
        setTimeElapsed(0);
        break;
      }
    }
  };

  const checkForWinner = (newBoard, row, col) => {
    if (
      checkDirection(newBoard, row, col, 0, 1) ||
      checkDirection(newBoard, row, col, 0, -1) ||
      checkDirection(newBoard, row, col, 1, 0) ||
      checkDirection(newBoard, row, col, 1, 1) ||
      checkDirection(newBoard, row, col, 1, -1)
    ) {
      setGameOver(true);
      alert(`${currentPlayer.name} venceu!`);
    }
  };

  const checkDirection = (board, row, col, rowDir, colDir) => {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      const r = row + i * rowDir;
      const c = col + i * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer.color) {
        count++;
      } else break;
    }

    for (let i = 1; i < 4; i++) {
      const r = row - i * rowDir;
      const c = col - i * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer.color) {
        count++;
      } else break;
    }

    return count >= 4;
  };

  const botPlay = () => {
    if (gameOver || currentPlayer.color !== player2Color) return;

    let colIndex = -1;
    for (let col = 0; col < COLS; col++) {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
          colIndex = col;
          break;
        }
      }
      if (colIndex !== -1) break;
    }

    if (colIndex !== -1) {
      handleColumnClick(colIndex);
    }
  };

  useEffect(() => {
    if (opponent === '2' && currentPlayer.color === player2Color) {
      const timeout = setTimeout(() => {
        botPlay();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, opponent, board]);

  useEffect(() => {
    if (gameOver) return;

    setTimeElapsed(0);

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= 10) {
          setCurrentPlayer(currentPlayer.color === player1Color
            ? { name: player2Name, color: player2Color }
            : { name: player1Name, color: player1Color });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPlayer, gameOver]);

  const handleMouseMove = (e) => {
    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left;
    const colWidth = boardRect.width / COLS;
    const colIndex = Math.floor(x / colWidth);
    setHighlightedCol(colIndex);
  };

  const getColorStyle = (color) => {
    switch (color) {
      case '🔴': return 'red';
      case '🟡': return 'yellow';
      case '🔵': return 'blue';
      default: return color || 'gray';
    }
  };

  return (
    <div>
      <div className="game-info">
        {gameOver
          ? "Jogo encerrado"
          : `${currentPlayer.name} (${currentPlayer.color}) - Tempo da jogada: ${timeElapsed} seg`}
      </div>

      <div className="game-board" onMouseMove={handleMouseMove}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleColumnClick(colIndex)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleColumnClick(colIndex)}
                className={`board-cell ${highlightedCol === colIndex ? 'highlighted' : ''} ${gameOver ? 'disabled' : ''}`}
                style={{ color: cell ? getColorStyle(cell) : undefined }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}

        {highlightedCol !== null && (
         <div
  className="highlight-piece"
  style={{
    left: `calc(${(100 / COLS) * highlightedCol}% - 20px)`, // Ajuste de centralização
    backgroundColor: getColorStyle(currentPlayer.color)
  }}
></div>
        )}
      </div>

      {gameOver && (
        <div className="game-over-button">
          <button onClick={resetGame}>Reiniciar Jogo</button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
