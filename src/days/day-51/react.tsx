import { useState } from "react";

export const meta = {
  id: "day-51-react",
  title: "Practice Progress Meter",
  prompt: "Build a progress meter controlled by buttons.",
};

const steps = ["Read", "Solve", "Verify", "Commit"];

export function Solution() {
  const [index, setIndex] = useState(0);

  return (
    <div className="demo-surface">
      <span className="badge">{steps[index]}</span>
      <div className="demo-row">
        <button className="demo-button secondary" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>
          Previous
        </button>
        <button className="demo-button" disabled={index === steps.length - 1} onClick={() => setIndex((value) => value + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
