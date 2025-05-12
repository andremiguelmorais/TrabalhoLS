import React from "react";
import "./game-board.css";
const ROWS = 6;
const COLS = 7;

function GameBoard() {
  const [board, setBoard] = useState(Array(ROWS).fill().map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('🔴');

  const handleColumnClick = (colIndex) => {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][colIndex]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][colIndex] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === '🔴' ? '🟡' : '🔴');
        break;
      }
    }
  };

  return (
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
                cursor: 'pointer',
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;