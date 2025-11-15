import { useState } from "react";

export const meta = {
  id: "day-37-react",
  title: "Habit Toggle List",
  prompt: "Toggle habit items between open and done.",
};

export function Solution() {
  const [topic, setTopic] = useState("DSA");

  return (
    <div className="demo-surface">
      <select className="demo-select" value={topic} onChange={(event) => setTopic(event.target.value)}>
        <option>DSA</option>
        <option>JavaScript</option>
        <option>React</option>
      </select>
      <span className="badge">Today: {topic}</span>
    </div>
  );
}
