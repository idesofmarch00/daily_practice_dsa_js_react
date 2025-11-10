import { useState } from "react";

export const meta = {
  id: "day-32-react",
  title: "Greeting Form",
  prompt: "Submit a name and show a greeting.",
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
