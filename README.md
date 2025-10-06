# Daily DSA JS React

A small daily practice repo for building a GitHub contribution habit.

Each day has three problems:

- `dsa.ts` for a basic data structures and algorithms problem.
- `js.ts` for a JavaScript fundamentals problem.
- `react.tsx` for a small React component challenge.

The website uses React, TanStack Router, and TanStack Table. DSA and JS answers render in a terminal-style output panel. React answers render as interactive components.

## Structure

```txt
src/
  data/questions.ts
  days/
    day-01/
      dsa.ts
      js.ts
      react.tsx
    ...
  routes and components
docs/
  PRD.md
  AGENT_SPEC.md
```

## Run locally

```bash
npm install
npm run dev
```

Open the local URL from Vite. The routes are:

- `/`
- `/day/day-01`
- `/day/day-01/dsa`
- `/day/day-01/js`
- `/day/day-01/react`

## Daily workflow

1. Pick the current day folder.
2. Solve `dsa.ts`, `js.ts`, and `react.tsx`.
3. Run the website and verify the output.
4. Commit and push that day's changes.

This initial version includes 60 days, so it is ready for backdated commits or future expansion.
