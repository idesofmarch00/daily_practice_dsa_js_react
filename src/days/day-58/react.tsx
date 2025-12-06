import { useMemo, useState } from "react";

export const meta = {
  id: "day-58-react",
  title: "Book Cart Quantity",
  prompt: "Build plus and minus quantity controls.",
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
