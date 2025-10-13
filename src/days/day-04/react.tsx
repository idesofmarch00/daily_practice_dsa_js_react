import { useState } from "react";

export const meta = {
  id: "day-04-react",
  title: "Tabs",
  prompt: "Build tabs that switch between DSA, JS, and React notes.",
};

const tabs = {
  DSA: "Solve with clear inputs, outputs, and complexity notes.",
  JS: "Practice language behavior, arrays, objects, and functions.",
  React: "Turn state changes into predictable UI.",
};

export function Solution() {
  const [active, setActive] = useState<keyof typeof tabs>("DSA");

  return (
    <div className="demo-surface">
      <div className="demo-row">
        {Object.keys(tabs).map((tab) => (
          <button
            key={tab}
            className={tab === active ? "demo-button" : "demo-button secondary"}
            onClick={() => setActive(tab as keyof typeof tabs)}
          >
            {tab}
          </button>
        ))}
      </div>
      <p>{tabs[active]}</p>
    </div>
  );
}
