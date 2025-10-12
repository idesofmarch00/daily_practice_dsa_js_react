import { useState } from "react";

export const meta = {
  id: "day-03-react",
  title: "Accordion",
  prompt: "Build a single-open accordion for three FAQ items.",
};

const items = [
  ["What is DSA?", "Data structures and algorithms help you reason about code performance."],
  ["Why JavaScript?", "It sharpens everyday frontend and backend problem solving."],
  ["Why React?", "It practices state, props, events, and UI composition."],
];

export function Solution() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="demo-surface">
      {items.map(([question, answer], index) => (
        <div key={question}>
          <button
            className="demo-button secondary"
            onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
          >
            {question}
          </button>
          {openIndex === index ? <p>{answer}</p> : null}
        </div>
      ))}
    </div>
  );
}
