import { useState } from "react";

export const meta = {
  id: "day-01-react",
  title: "Counter",
  prompt: "Build a counter with increment, decrement, and reset controls.",
};

export function Solution() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-surface">
      <span className="badge">Count: {count}</span>
      <div className="demo-row">
        <button className="demo-button" onClick={() => setCount((value) => value + 1)}>
          Increment
        </button>
        <button className="demo-button secondary" onClick={() => setCount((value) => value - 1)}>
          Decrement
        </button>
        <button className="demo-button secondary" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
