import type { ComponentType } from "react";

export type ProblemType = "dsa" | "js" | "react";

export type ProblemMeta = {
  id: string;
  title: string;
  prompt: string;
  explanation?: { line: string; desc: string }[];
};

export type ConsoleProblem = ProblemMeta & {
  type: "dsa" | "js";
  source: string;
  run: () => string | Promise<string>;
};

export type ReactProblem = ProblemMeta & {
  type: "react";
  source: string;
  Component: ComponentType;
};

export type Problem = ConsoleProblem | ReactProblem;

export type DayEntry = {
  day: number;
  slug: string;
  title: string;
  summary: string;
  problems: {
    dsa: ConsoleProblem;
    js: ConsoleProblem;
    react: ReactProblem;
  };
};
