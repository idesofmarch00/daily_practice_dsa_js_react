import { useState } from "react";

export const meta = {
  id: "day-35-react",
  title: "Submission Preview",
  prompt: "Build a form with a submitted text preview.",
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
