import { useState } from "react";

export const meta = {
  id: "day-06-react",
  title: "Temperature Converter",
  prompt: "Build a small Celsius to Fahrenheit converter.",
};

export function Solution() {
  const [celsius, setCelsius] = useState(25);
  const fahrenheit = Math.round((celsius * 9) / 5 + 32);

  return (
    <div className="demo-surface">
      <label>
        Celsius
        <input
          className="demo-input"
          type="number"
          value={celsius}
          onChange={(event) => setCelsius(Number(event.target.value))}
        />
      </label>
      <span className="badge">{fahrenheit}F</span>
    </div>
  );
}
