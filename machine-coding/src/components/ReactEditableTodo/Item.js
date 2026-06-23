import React, { useState } from "react";

const Item = ({ todo, handleComplete, handleDelete, handleUpdate }) => {
  const [isEditing, setEditing] = useState(false);
  const [updateValue, setUpdatedValue] = useState(todo.value);
  return (
    <div key={todo.id} style={{ margin: "0.5em" }}>
      {todo.isCompleted ? (
        <span
          style={{
            marginRight: "2rem",
            textDecoration: "line-through",
          }}
        >
          {todo.value}
        </span>
      ) : isEditing ? (
        <input
          value={updateValue}
          type="text"
          onChange={(e) => setUpdatedValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleUpdate(todo.id, updateValue);
              setEditing(false);
            }
          }}
        />
      ) : (
        <span style={{ marginRight: "2rem" }}>{todo.value}</span>
      )}

      <span
        style={{ marginRight: "0.5em", cursor: "pointer" }}
        onClick={() => handleComplete(todo.id)}
      >
        ✔️
      </span>
      {!isEditing && !todo.isCompleted && (
        <span
          style={{ marginRight: "0.5em", cursor: "pointer" }}
          onClick={() => setEditing(true)}
        >
          📝
        </span>
      )}
      <span style={{ cursor: "pointer" }} onClick={() => handleDelete(todo.id)}>
        ❌
      </span>
    </div>
  );
};

export default React.memo(Item);
