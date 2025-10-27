import { useMemo, useState } from "react";

export const meta = {
  id: "day-18-react",
  title: "Pin Visibility Toggle",
  prompt: "Switch an input between hidden and visible text.",
};

export function Solution() {
  const [text, setText] = useState("Small daily reps matter.");
  const words = useMemo(() => text.trim().split(/\s+/).filter(Boolean).length, [text]);

  return (
    <div className="demo-surface">
      <textarea className="demo-input" value={text} onChange={(event) => setText(event.target.value)} />
      <span className="badge">{words} words</span>
    </div>
  );
}
