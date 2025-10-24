import { useState } from "react";

export const meta = {
  id: "day-15-react",
  title: "Checklist Stepper",
  prompt: "Navigate through a short checklist.",
};

export function Solution() {
  const [name, setName] = useState("Sahil");
  const [submitted, setSubmitted] = useState("Sahil");

  return (
    <div className="demo-surface">
      <div className="demo-row">
        <input className="demo-input" value={name} onChange={(event) => setName(event.target.value)} />
        <button className="demo-button" onClick={() => setSubmitted(name)}>
          Submit
        </button>
      </div>
      <span className="badge">Hello, {submitted}</span>
    </div>
  );
}
