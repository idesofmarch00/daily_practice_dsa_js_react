import { useState, useEffect } from "react";
import defaultTodos from "../data/todos.json";

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

export function SharedTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newText, setNewText] = useState("");
  const [copied, setCopied] = useState(false);

  // Load baseline & user overrides
  useEffect(() => {
    const saved = localStorage.getItem("daily_practice_todos");
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch {
        setTodos(defaultTodos);
      }
    } else {
      setTodos(defaultTodos);
    }
  }, []);

  // Update storage helper
  const updateTodos = (newTodos: TodoItem[]) => {
    setTodos(newTodos);
    localStorage.setItem("daily_practice_todos", JSON.stringify(newTodos, null, 2));
  };

  const toggleTodo = (id: string) => {
    updateTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newItem: TodoItem = {
      id: `custom-${Date.now()}`,
      text: newText.trim(),
      completed: false,
    };

    updateTodos([...todos, newItem]);
    setNewText("");
  };

  const deleteTodo = (id: string) => {
    updateTodos(todos.filter((todo) => todo.id !== id));
  };

  const resetToBaseline = () => {
    if (window.confirm("Reset todos to baseline todos.json?")) {
      updateTodos(defaultTodos);
    }
  };

  const copyJson = () => {
    const cleanJson = JSON.stringify(todos, null, 2);
    navigator.clipboard.writeText(cleanJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="shared-todos-footer">
      <div className="todos-container">
        <div className="todos-header">
          <h3>Shared Habits & Todo Center</h3>
          <div className="todos-actions">
            <button type="button" onClick={copyJson} className="todos-btn secondary">
              {copied ? "Copied!" : "Copy JSON for Git Commit"}
            </button>
            <button type="button" onClick={resetToBaseline} className="todos-btn danger">
              Reset to Baseline
            </button>
          </div>
        </div>
        
        <form onSubmit={addTodo} className="todos-add-form">
          <input
            type="text"
            placeholder="Add a custom study habit or task..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="todos-input"
          />
          <button type="submit" className="todos-btn primary">Add Task</button>
        </form>

        <ul className="todos-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </label>
              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className="todos-delete-btn"
                title="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
