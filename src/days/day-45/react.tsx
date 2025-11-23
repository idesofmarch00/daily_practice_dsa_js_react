import { useState } from "react";

export const meta = {
  id: "day-45-react",
  title: "Study Topic Select",
  prompt: "Display the selected study topic.",
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
