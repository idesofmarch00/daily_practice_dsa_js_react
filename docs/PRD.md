# PRD: Daily DSA, JS, and React Practice Repo

## Goal

Create a lightweight repository that supports a daily coding habit. Every day includes one DSA problem, one JavaScript problem, and one React problem. The solved work is visible in a simple website, making it easy to review progress and push one meaningful commit per day.

## Users

- A learner practicing fundamentals consistently.
- A future coding assistant that can add new days without changing the app architecture.

## Core Experience

The home page shows a table of days. Each day links to three child routes:

- `day-XX/dsa`
- `day-XX/js`
- `day-XX/react`

DSA and JS routes render:

- Problem title.
- Prompt.
- Source code.
- Terminal-style output.

React routes render:

- Problem title.
- Prompt.
- Source code.
- Live component preview.

## Functional Requirements

- The app must use React.
- The app must use TanStack Router for navigation.
- The app must use TanStack Table for the day overview.
- The initial database must contain 60 days.
- Each day must have exactly three solution files: `dsa.ts`, `js.ts`, and `react.tsx`.
- DSA and JS solutions must expose a `run()` function for website output.
- React solutions must expose a component for website rendering.
- The question database must describe all 10 days and connect each route to its source file.

## Non-Goals

- No login.
- No backend.
- No remote database.
- No automated GitHub backdating inside the app.
- No heavy styling framework.

## Success Criteria

- `npm run dev` starts the website.
- The home route lists all 60 days.
- Every day has DSA, JS, and React links.
- DSA and JS pages show terminal output.
- React pages show a live UI.
- The folder structure is easy to expand to day 11 and beyond.
