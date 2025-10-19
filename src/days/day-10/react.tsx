import { useMemo, useState } from "react";

export const meta = {
  id: "day-10-react",
  title: "Pagination",
  prompt: "Build simple pagination over a fixed list.",
};

const items = Array.from({ length: 12 }, (_, index) => `Question ${index + 1}`);
const pageSize = 4;

export function Solution() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / pageSize);
  const visible = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [page],
  );

  return (
    <div className="demo-surface">
      <ul className="simple-list">
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="demo-row">
        <button
          className="demo-button secondary"
          disabled={page === 1}
          onClick={() => setPage((value) => value - 1)}
        >
          Previous
        </button>
        <span className="badge">
          Page {page} of {totalPages}
        </span>
        <button
          className="demo-button secondary"
          disabled={page === totalPages}
          onClick={() => setPage((value) => value + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
