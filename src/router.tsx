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

  return (
    <section className="page-stack">
      <div>
        <Link className="back-link" to="/">
          Back to all days
        </Link>
        <h1>{day.title}</h1>
        <p className="muted">{day.summary}</p>
      </div>
      <div className="problem-grid">
        {(["dsa", "js", "react"] as ProblemType[]).map((type) => {
          const problem = day.problems[type];

          return (
            <Link
              key={problem.id}
              className="problem-card"
              to="/day/$dayId/$problemType"
              params={{ dayId: day.slug, problemType: type }}
            >
              <span>{type.toUpperCase()}</span>
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
      ) : (
        problem.type !== "react" && <TerminalOutput problem={problem} />
      )}

      <section className="panel">
        <h2>Solution Source</h2>
        <CodeBlock code={problem.source} />
      </section>
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
