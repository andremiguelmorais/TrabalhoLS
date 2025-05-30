import React, { useState, useEffect } from "react";
import WinnerModal from "../Confetis/WinnerModal.component";
import "./game-board.css";

const ROWS = 6;
const COLS = 7;

function GameBoard({ opponent, player1Name, player2Name, player1Color, player2Color }) {
  const getRandomStartingPlayer = () =>
    Math.random() < 0.5
      ? { name: player1Name, color: player1Color }
      : { name: player2Name, color: player2Color };

  const [board, setBoard] = useState(
    Array(ROWS).fill().map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(getRandomStartingPlayer());
  const [gameOver, setGameOver] = useState(false);
  const [highlightedCol, setHighlightedCol] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
    setCurrentPlayer(getRandomStartingPlayer());
    setGameOver(false);
    setHighlightedCol(null);
    setTimeElapsed(0);
    setWinner(null);
  };

  const handleColumnClick = (colIndex) => {
    if (gameOver) return;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][colIndex]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][colIndex] = currentPlayer.color;
        setBoard(newBoard);
        checkForWinner(newBoard, row, colIndex);
        setCurrentPlayer(
          currentPlayer.color === player1Color
            ? { name: player2Name, color: player2Color }
            : { name: player1Name, color: player1Color }
        );
        setTimeElapsed(0);
        break;
      }
    }
  };

  const checkForWinner = (newBoard, row, col) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1]
    ];
    if (dirs.some(([dx, dy]) => checkDirection(newBoard, row, col, dx, dy))) {
      setGameOver(true);
      setWinner(currentPlayer.name);
    }
  };

  const checkDirection = (board, row, col, dx, dy) => {
    let count = 1;
    for (let dir of [1, -1]) {
      for (let i = 1; i < 4; i++) {
        const r = row + i * dx * dir;
        const c = col + i * dy * dir;
        if (
          r >= 0 &&
          r < ROWS &&
          c >= 0 &&
          c < COLS &&
          board[r][c] === currentPlayer.color
        ) {
          count++;
        } else break;
      }
    }
    return count >= 4;
  };

  // Bot simples
  useEffect(() => {
    if (opponent === "2" && currentPlayer.color === player2Color && !gameOver) {
      const t = setTimeout(() => handleColumnClick(Math.floor(Math.random() * COLS)), 500);
      return () => clearTimeout(t);
    }
  }, [currentPlayer, opponent, board, gameOver]);

  // Timer de 10s
  useEffect(() => {
    if (gameOver) return;
    setTimeElapsed(0);
    const interval = setInterval(() => {
      setTimeElapsed((t) => {
        if (t >= 10) {
          setCurrentPlayer((p) =>
            p.color === player1Color
              ? { name: player2Name, color: player2Color }
              : { name: player1Name, color: player1Color }
          );
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentPlayer, gameOver, player1Color, player2Color, player1Name, player2Name]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const colWidth = rect.width / COLS;
    setHighlightedCol(Math.floor(x / colWidth));
  };

  const getColorStyle = (c) => {
    switch (c) {
      case "🔴":
        return "red";
      case "🟡":
        return "yellow";
      case "🔵":
        return "blue";
      default:
        return c || "gray";
    }
  };

  return (
    <div>
      {/* Modal com confetti */}
      {winner && (
        <WinnerModal winner={winner} onClose={() => setWinner(null)} />
      )}

      <div className="game-info">
        {gameOver
          ? `Jogo encerrado - Vencedor: ${winner}`
          : `${currentPlayer.name} (${currentPlayer.color}) - Tempo: ${timeElapsed}s`}
      </div>

      <div className="game-board" onMouseMove={handleMouseMove}>
        {board.map((row, r) => (
          <div key={r} className="board-row">
            {row.map((cell, c) => (
              <div
                key={c}
                className={`board-cell ${
                  highlightedCol === c ? "highlighted" : ""
                } ${gameOver ? "disabled" : ""}`}
                onClick={() => handleColumnClick(c)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleColumnClick(c)}
                style={{ color: cell ? getColorStyle(cell) : undefined }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
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
