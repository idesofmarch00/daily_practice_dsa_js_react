import { useState } from "react";

export const meta = {
  id: "day-43-react",
  title: "Skill Picker",
  prompt: "Preview the selected skill from a select input.",
};

export function Solution() {
  const [rating, setRating] = useState(3);

  return (
    <div className="demo-surface">
      <div className="demo-row">
        {[1, 2, 3, 4, 5].map((value) => (
          <button key={value} className={value <= rating ? "demo-button" : "demo-button secondary"} onClick={() => setRating(value)}>
            {value}
          </button>
        ))}
      </div>
      <span className="badge">Rating: {rating}/5</span>
    </div>
  );
}
