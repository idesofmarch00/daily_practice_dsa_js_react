import { useState } from "react";

export const meta = {
  id: "day-52-react",
  title: "Course Progress Meter",
  prompt: "Increase or decrease course progress.",
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
