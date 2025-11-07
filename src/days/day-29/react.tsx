import { useState } from "react";

export const meta = {
  id: "day-29-react",
  title: "Status Color Picker",
  prompt: "Select a status color and show its value.",
};

export function Solution() {
  const [progress, setProgress] = useState(40);

  return (
    <div className="demo-surface">
      <progress max={100} value={progress} />
      <div className="demo-row">
        <button className="demo-button secondary" onClick={() => setProgress((value) => Math.max(0, value - 10))}>Less</button>
        <span className="badge">{progress}%</span>
        <button className="demo-button" onClick={() => setProgress((value) => Math.min(100, value + 10))}>More</button>
      </div>
    </div>
  );
}
