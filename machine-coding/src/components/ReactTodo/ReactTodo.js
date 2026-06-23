import React, { useEffect, useState } from "react";

const ReactTodo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || [],
  );
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const addTodo = () => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos.push({
      value: task,
      isCompleted: false,
      id: new Date().getTime(),
    });
    setTodos(newTodos);
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      addTodo();
    }
  };

  const handleDelete = (id) => {
    const filteredTodo = todos.filter((todo) => {
      return todo.id != id;
    });
    setTodos(filteredTodo);
  };

  const handleComplete = (id) => {
    const newTodos = todos.map((todo) => {
      return { ...todo };
    });
    newTodos?.forEach((todo) => {
      if (todo.id == id) {
        todo.isCompleted = !todo.isCompleted;
      }
      setTodos(newTodos);
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <div>
        <input
          value={task}
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {todos?.map((todo) => {
          return (
            <div key={todo.id} style={{ margin: "0.5em" }}>
              {!todo.isCompleted ? (
                <span style={{ marginRight: "2rem" }}>{todo.value}</span>
              ) : (
                <span
                  style={{
                    marginRight: "2rem",
                    textDecoration: "line-through",
                  }}
                >
                  {todo.value}
                </span>
              )}

              <span
                style={{ marginRight: "0.5em", cursor: "pointer" }}
                onClick={() => handleComplete(todo.id)}
              >
                ✔️
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete(todo.id)}
              >
                ❌
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReactTodo;
