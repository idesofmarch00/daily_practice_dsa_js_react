import { useState } from "react";

export const meta = {
  id: "day-46-react",
  title: "Notes Word Counter",
  prompt: "Build a text area that counts words.",
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
