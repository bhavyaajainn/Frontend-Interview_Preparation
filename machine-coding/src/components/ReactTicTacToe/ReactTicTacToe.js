import React, { useState } from "react";
import Board from "./Board";
import "./ReactTicTacToe.css";
import { checkWinner } from "./utils/ticTacToeUtils";

const ReactTicTacToe = ({ size = 4 }) => {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => {
      return Array(size).fill(null);
    }),
  );
  const [turnX, setTurnX] = useState(true);
  const winner = checkWinner(board, size);
  const status = winner
    ? `Winner is ${winner}`
    : turnX
      ? "Player X turn"
      : "Player O turn";
  const handleClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] || winner) {
      return;
    }
    const deepCopy = JSON.parse(JSON.stringify(board));
    deepCopy[rowIndex][colIndex] = turnX ? "X" : "O";
    setBoard(deepCopy);
    setTurnX(!turnX);
  };
  const handleReset = () => {
    setBoard(
      Array.from({ length: size }, () => {
        return Array(size).fill(null);
      }),
    );
  };
  return (
    <div className="container">
      <Board handleClick={handleClick} board={board} size={size} />
      <div className="status">{status}</div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ReactTicTacToe;
