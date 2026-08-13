import { useState } from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  useParams,
} from "@tanstack/react-router";
import { CodeBlock } from "./components/CodeBlock";
import { DayTable } from "./components/DayTable";
import { TerminalOutput } from "./components/TerminalOutput";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { SharedTodos } from "./components/SharedTodos";
import { days, getDay, getProblem } from "./data/questions";
import type { ProblemType } from "./types";

function RootLayout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          Daily Practice
        </Link>
        <nav>
          <Link to="/">All days</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <SharedTodos />
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <section className="page-stack">
      <div className="intro">
        <p className="eyebrow">{days.length}-day starter database</p>
        <h1>DSA, JavaScript, and React every day.</h1>
        <p>
          Pick a day, solve the three files, verify the output, then commit and push.
        </p>
      </div>
      <DayTable days={days} />
    </section>
  );
}

function DayPage() {
  const { dayId } = useParams({ from: "/day/$dayId" });
  const day = getDay(dayId);

  if (!day) {
    return <NotFound message={`No day found for ${dayId}.`} />;
  }

  // Habits state for this specific day
  const defaultHabits = [
    { id: "walk", text: "🚶‍♂️ Walk around, go out, and exercise when taking a break" },
    { id: "stretch", text: "🧘‍♂️ Stretch or do 5 minutes of house chores between sessions" },
    { id: "pomodoro", text: "⏱️ Use Pomodoro technique to maintain focus" },
    { id: "notes", text: "📝 Make active study notes during practice" },
    { id: "explain", text: "🗣️ Explain concepts out loud or to someone else" },
    { id: "code", text: "💻 Actually code and build the solution, don't just read it" },
    { id: "journal", text: "📅 Journal your progress and schedule your timetable" },
  ];

  const storageKey = `habits-${day.slug}`;
  const [checkedHabits, setCheckedHabits] = useState<string[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const toggleHabit = (id: string) => {
    const newChecked = checkedHabits.includes(id)
      ? checkedHabits.filter((h) => h !== id)
      : [...checkedHabits, id];
    setCheckedHabits(newChecked);
    localStorage.setItem(storageKey, JSON.stringify(newChecked));
  };

  return (
    <section className="page-stack">
      <div>
        <Link className="back-link" to="/">
          Back to all days
        </Link>
        <h1>{day.title}</h1>
        <p className="muted">{day.summary}</p>
      </div>

      <div className="panel habits-panel">
        <h2 className="habits-title">Daily Success & Health Habits</h2>
        <p className="habits-intro">Take care of your mind and body. Check off your study habits for today:</p>
        <div className="habits-grid">
          {defaultHabits.map((habit) => (
            <label key={habit.id} className={`habit-item ${checkedHabits.includes(habit.id) ? "checked" : ""}`}>
              <input
                type="checkbox"
                checked={checkedHabits.includes(habit.id)}
                onChange={() => toggleHabit(habit.id)}
              />
              <span>{habit.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="problem-grid">
        {(["dsa", "js", "react", "interview", "io"] as ProblemType[])
          .filter((type) => {
            if (type === "interview" && !day.problems.interview) return false;
            if (type === "io" && !day.problems.io) return false;
            return true;
          })
          .map((type) => {
            const problem = day.problems[type]!;

            return (
              <Link
                key={problem.id}
                className="problem-card"
                to="/day/$dayId/$problemType"
                params={{ dayId: day.slug, problemType: type }}
              >
                <span>
                  {type === "interview"
                    ? "INTERVIEW"
                    : type === "io"
                      ? "I/O QUESTIONS"
                      : type.toUpperCase()}
                </span>
                <strong>{problem.title}</strong>
                <small>{problem.prompt}</small>
              </Link>
            );
          })}
      </div>
    </section>
  );
}

function ProblemPage() {
  const { dayId, problemType } = useParams({ from: "/day/$dayId/$problemType" });
  const problem = getProblem(dayId, problemType);

  if (!problem) {
    return <NotFound message={`No ${problemType} problem found for ${dayId}.`} />;
  }

  const ReactSolution = problem.type === "react" ? problem.Component : null;

  return (
    <section className="page-stack">
      <div>
        <Link className="back-link" to="/day/$dayId" params={{ dayId }}>
          Back to {dayId}
        </Link>
        <p className="eyebrow">{problem.type.toUpperCase()}</p>
        <h1>{problem.title}</h1>
        <p className="muted">{problem.prompt}</p>
      </div>

      {problem.type === "react" && ReactSolution ? (
        <section className="panel preview-panel">
          <h2>Live Preview</h2>
          <ReactSolution />
        </section>
      ) : (problem.type === "interview" || problem.type === "io") ? (
        <section className="panel interview-panel">
          <h2>{problem.type === "io" ? "Input-Output Questions" : "Questions & Answers"}</h2>
          <div className="interview-accordion-list">
            {problem.questions.map((q, idx) => (
              <details key={idx} className="explanation-details interview-details">
                <summary className="explanation-summary interview-summary">
                  <span>{idx + 1}. {q.question}</span>
                </summary>
                <div className="explanation-content interview-content">
                  <MarkdownRenderer content={q.answer} />
                  {q.citations && q.citations.length > 0 && (
                    <div className="citations-section">
                      <hr className="citations-hr" />
                      <span className="citations-title">Citations & References:</span>
                      <ol className="citations-list">
                        {q.citations.map((cite, cIdx) => (
                          <li key={cIdx}>
                            <a href={cite} target="_blank" rel="noopener noreferrer">
                              {cite}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : (
        (problem.type === "dsa" || problem.type === "js") && <TerminalOutput problem={problem} />
      )}

      {problem.type !== "interview" && problem.type !== "io" && (
        <section className="panel">
          <h2>Solution Source</h2>
          <CodeBlock code={problem.source} />
        </section>
      )}

      {problem.explanation && problem.explanation.length > 0 && (
        <details className="explanation-details">
          <summary className="explanation-summary">
            <span>Line-by-Line Code Explanation</span>
          </summary>
          <div className="explanation-content">
            <h3>How it works & Syntax Breakdown</h3>
            <table className="explanation-table">
              <thead>
                <tr>
                  <th style={{ width: "40%" }}>Code Syntax</th>
                  <th style={{ width: "60%" }}>Explanation / Rationale</th>
                </tr>
              </thead>
              <tbody>
                {problem.explanation.map((item, idx) => (
                  <tr key={idx}>
                    <td className="explanation-code-cell">{item.line}</td>
                    <td className="explanation-desc-cell">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </section>
  );
}

function NotFound({ message }: { message: string }) {
  return (
    <section className="page-stack">
      <h1>Not found</h1>
      <p className="muted">{message}</p>
      <Link className="button-link" to="/">
        Go home
      </Link>
    </section>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const dayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/day/$dayId",
  component: DayPage,
});

const problemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/day/$dayId/$problemType",
  component: ProblemPage,
});

const routeTree = rootRoute.addChildren([indexRoute, dayRoute, problemRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
