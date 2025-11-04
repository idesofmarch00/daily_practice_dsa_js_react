import { useState } from "react";

export const meta = {
  id: "day-26-react",
  title: "Theme Color Picker",
  prompt: "Build a small color picker that previews the selected color.",
};

const initialItems = ["DSA", "JS", "React"];

export function Solution() {
  const [done, setDone] = useState<string[]>(["DSA"]);

  return (
    <div className="demo-surface">
      <ul className="simple-list">
        {initialItems.map((item) => {
          const complete = done.includes(item);

          return (
            <li key={item} onClick={() => setDone((items) => (complete ? items.filter((value) => value !== item) : [...items, item]))}>
              {complete ? "Done: " : "Open: "}{item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
