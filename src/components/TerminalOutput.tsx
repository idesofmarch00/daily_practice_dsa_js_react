import { useEffect, useState } from "react";
import type { ConsoleProblem } from "../types";

type TerminalOutputProps = {
  problem: ConsoleProblem;
};

export function TerminalOutput({ problem }: TerminalOutputProps) {
  const [output, setOutput] = useState<string>("Running...");

  useEffect(() => {
    let active = true;
    const result = problem.run();

    if (result instanceof Promise) {
      result.then((res) => {
        if (active) {
          setOutput(res);
          console.group(problem.title);
          console.log(res);
          console.groupEnd();
        }
      });
    } else {
      setOutput(result);
      console.group(problem.title);
      console.log(result);
      console.groupEnd();
    }

    return () => {
      active = false;
    };
  }, [problem]);

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
