import { useState } from "react";

export const meta = {
  id: "day-17-react",
  title: "Secret Token Toggle",
  prompt: "Toggle visibility for a secret token input.",
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
