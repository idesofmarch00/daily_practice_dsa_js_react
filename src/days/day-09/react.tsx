import { useState } from "react";

export const meta = {
  id: "day-09-react",
  title: "Theme Toggle",
  prompt: "Build a theme toggle that switches the preview colors.",
};

export function Solution() {
  const [dark, setDark] = useState(false);

  return (
    <div
      className="demo-surface"
      style={{
        background: dark ? "#202821" : "#f2f5ed",
        color: dark ? "#f7f8f4" : "#18201c",
      }}
    >
      <span className="badge">{dark ? "Dark" : "Light"} mode</span>
      <button className="demo-button" onClick={() => setDark((value) => !value)}>
        Toggle theme
      </button>
    </div>
  );
}
