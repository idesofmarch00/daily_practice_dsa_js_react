import { useEffect, useMemo } from "react";
import type { ConsoleProblem } from "../types";

type TerminalOutputProps = {
  problem: ConsoleProblem;
};

export function TerminalOutput({ problem }: TerminalOutputProps) {
  const output = useMemo(() => problem.run(), [problem]);

  useEffect(() => {
    console.group(problem.title);
    console.log(output);
    console.groupEnd();
  }, [output, problem.title]);

  return (
    <section className="panel">
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">console output</span>
      </div>
      <pre className="terminal-body">{output}</pre>
    </section>
  );
}
