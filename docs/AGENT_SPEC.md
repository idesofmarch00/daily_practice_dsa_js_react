# Agent Steps and Specs

## Purpose

This file tells future agents how to extend the repo safely.

## Add a New Day

1. Create a folder under `src/days/day-XX`.
2. Add these files:
   - `dsa.ts`
   - `js.ts`
   - `react.tsx`
3. Export the expected symbols from each file:
   - DSA and JS: `meta`, solver functions, and `run()`.
   - React: `meta` and `Solution`.
4. Run `npm run build`.

The database in `src/data/questions.ts` auto-discovers matching day folders, so no import list needs to be edited for normal additions.

## Console Problem File Contract

```ts
export const meta = {
  id: "day-XX-dsa",
  title: "Problem Title",
  prompt: "Question prompt.",
};

export function run() {
  return "terminal output";
}
```

## React Problem File Contract

```tsx
export const meta = {
  id: "day-XX-react",
  title: "Component Title",
  prompt: "Component prompt.",
};

export function Solution() {
  return <div>Live solution</div>;
}
```

## Routing Rules

- Day overview route: `/day/$dayId`
- Problem route: `/day/$dayId/$problemType`
- `dayId` must match `day-01`, `day-02`, etc.
- `problemType` must be `dsa`, `js`, or `react`.

## Style Rules

- Keep CSS in `src/styles.css`.
- Keep the UI simple and readable.
- Use terminal-style output only for DSA and JS.
- Do not add authentication or backend dependencies.

## Commit Habit

For daily green-square practice:

1. Work on one day at a time.
2. Verify the solution locally.
3. Commit only that day's changes.
4. Push to GitHub.
