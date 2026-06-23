import React from "react";
import "./ReactTicTacToe.css";

const Board = ({ handleClick, board, size }) => {
  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${size},50px)`,
      }}
    >
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <div
              className="cell"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Board;
