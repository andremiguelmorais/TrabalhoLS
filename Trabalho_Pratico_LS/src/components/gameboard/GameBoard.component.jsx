import React, { useState, useEffect } from "react";
import "./game-board.css";

const ROWS = 6;
const COLS = 7;

function GameBoard({ opponent, player1Name, player2Name, player1Color, player2Color }) {
  const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState({ name: player1Name, color: player1Color });
  const [gameOver, setGameOver] = useState(false);
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // Tempo da jogada

  const resetGame = () => {
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
    setCurrentPlayer({ name: player1Name, color: player1Color });
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
        setTimeElapsed(0); // Reseta o timer a cada jogada válida
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
      return;
    }
  };

  const checkDirection = (board, row, col, rowDir, colDir) => {
    let count = 1;

    for (let i = 1; i < 4; i++) {
      const r = row + i * rowDir;
      const c = col + i * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer.color) {
        count++;
      } else {
        break;
      }
    }

    for (let i = 1; i < 4; i++) {
      const r = row - i * rowDir;
      const c = col - i * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer.color) {
        count++;
      } else {
        break;
      }
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

  // UseEffect para o timer da jogada
  useEffect(() => {
    if (gameOver) return;

    setTimeElapsed(0); // Resetar tempo ao trocar jogador

    const interval = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= 10) {
          // Passa a vez automaticamente
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
    const boardRect = e.target.getBoundingClientRect();
    const x = e.clientX - boardRect.left;
    const colIndex = Math.floor(x / (boardRect.width / COLS));
    setHighlightedCol(colIndex);
  };

  const getColorStyle = (color) => {
    // Recebe a cor em string e retorna a cor CSS
    // Aqui simplificado para cores básicas
    return color || 'gray';
  };

  return (
    <div>
      {/* Exibir tempo da jogada */}
      <div style={{ marginBottom: 10, fontWeight: 'bold', textAlign: 'center' }}>
        {gameOver
          ? "Jogo encerrado"
          : `${currentPlayer.name} (${currentPlayer.color}) - Tempo da jogada: ${timeElapsed} seg`}
      </div>

      <div
        className="draggable-piece"
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", currentPlayer.color)}
        style={{
          width: 60,
          height: 60,
          backgroundColor: getColorStyle(currentPlayer.color),
          borderRadius: '50%',
          border: '2px solid white',
          margin: '0 auto',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          cursor: 'grab',
        }}
      ></div>
      <div
        className="game-board"
        onMouseMove={handleMouseMove}
        style={{ position: 'relative' }}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row" style={{ display: 'flex' }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => handleColumnClick(colIndex)}
                className={`board-cell ${highlightedCol === colIndex ? 'highlighted' : ''}`}
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

        {highlightedCol !== null && (
          <div
            className="highlight-piece"
            style={{
              position: 'absolute',
              top: -60,
              left: highlightedCol * 60,
              width: 60,
              height: 60,
              backgroundColor: getColorStyle(currentPlayer.color),
              borderRadius: '50%',
              border: '2px solid white',
            }}
          ></div>
        )}
      </div>

      {gameOver && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button onClick={resetGame}>Reiniciar Jogo</button>
        </div>
      )}
    </div>
  );
}

export default GameBoard;
