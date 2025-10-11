import { useState } from "react";

export const meta = {
  id: "day-02-react",
  title: "Tiny Todo List",
  prompt: "Build a todo list that adds items from an input.",
};

export function Solution() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(["Read prompt", "Write solution"]);

  function addTodo() {
    const trimmed = text.trim();

    if (trimmed.length === 0) return;

    setTodos((items) => [...items, trimmed]);
    setText("");
  }

  return (
    <div className="demo-surface">
      <div className="demo-row">
        <input
          className="demo-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="New todo"
        />
        <button className="demo-button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
