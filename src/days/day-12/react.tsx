import { useState } from "react";

export const meta = {
  id: "day-12-react",
  title: "Commit Flow Stepper",
  prompt: "Build a stepper for read, solve, verify, and commit.",
};

export function Solution() {
  const [shown, setShown] = useState(false);

  return (
    <div className="demo-surface">
      <input className="demo-input" type={shown ? "text" : "password"} value="practice123" readOnly />
      <button className="demo-button" onClick={() => setShown((value) => !value)}>
        {shown ? "Hide" : "Show"}
      </button>
    </div>
  );
}
