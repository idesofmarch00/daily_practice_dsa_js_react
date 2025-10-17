import { useMemo, useState } from "react";

export const meta = {
  id: "day-08-react",
  title: "Search Filter",
  prompt: "Build a search box that filters a small list of topics.",
};

const topics = ["Two Sum", "Binary Search", "React State", "Array Methods", "Linked List"];

export function Solution() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => topics.filter((topic) => topic.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="demo-surface">
      <input
        className="demo-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search topics"
      />
      <ul className="simple-list">
        {filtered.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
    </div>
  );
}
