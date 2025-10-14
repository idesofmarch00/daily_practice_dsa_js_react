import { useState } from "react";

export const meta = {
  id: "day-05-react",
  title: "Character Counter",
  prompt: "Build an input that shows live character count and remaining characters.",
};

const limit = 60;

export function Solution() {
  const [message, setMessage] = useState("Daily practice compounds.");
  const remaining = limit - message.length;

  return (
    <div className="demo-surface">
      <input
        className="demo-input"
        maxLength={limit}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <div className="demo-row">
        <span className="badge">{message.length} used</span>
        <span className="badge">{remaining} remaining</span>
      </div>
    </div>
  );
}
