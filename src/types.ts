import type { ComponentType } from "react";

export type ProblemType = "dsa" | "js" | "react" | "interview";

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

export type InterviewQuestion = {
  question: string;
  answer: string;
  citations?: string[];
};

export type InterviewProblem = ProblemMeta & {
  type: "interview";
  questions: InterviewQuestion[];
};

export type Problem = ConsoleProblem | ReactProblem | InterviewProblem;

export type DayEntry = {
  day: number;
  slug: string;
  title: string;
  summary: string;
  problems: {
    dsa: ConsoleProblem;
    js: ConsoleProblem;
    react: ReactProblem;
    interview?: InterviewProblem;
  };
};
