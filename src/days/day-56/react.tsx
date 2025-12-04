import { useState } from "react";

export const meta = {
  id: "day-56-react",
  title: "Quantity Mini Cart",
  prompt: "Build a quantity control and display the total price.",
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
