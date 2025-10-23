import { useState } from "react";

export const meta = {
  id: "day-14-react",
  title: "Onboarding Stepper",
  prompt: "Display one onboarding step at a time.",
};

const colors = ["#234b36", "#7c3aed", "#b45309"];

export function Solution() {
  const [color, setColor] = useState(colors[0]);

  return (
    <div className="demo-surface">
      <div className="demo-row">
        {colors.map((value) => (
          <button key={value} className="demo-button secondary" style={{ background: value, width: 44 }} onClick={() => setColor(value)} aria-label={value} />
        ))}
      </div>
      <span className="badge" style={{ background: color, color: "#ffffff" }}>{color}</span>
    </div>
  );
}
