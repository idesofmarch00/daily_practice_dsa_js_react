import type {
  ConsoleProblem,
  DayEntry,
  ProblemMeta,
  ProblemType,
  ReactProblem,
} from "../types";

type ConsoleModule = {
  meta: ProblemMeta;
  run: () => string;
};

type ReactModule = {
  meta: ProblemMeta;
  Solution: ReactProblem["Component"];
};

const dsaModules = import.meta.glob<ConsoleModule>("../days/day-*/dsa.ts", { eager: true });
const jsModules = import.meta.glob<ConsoleModule>("../days/day-*/js.ts", { eager: true });
const reactModules = import.meta.glob<ReactModule>("../days/day-*/react.tsx", { eager: true });

const dsaSources = import.meta.glob("../days/day-*/dsa.ts", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const jsSources = import.meta.glob("../days/day-*/js.ts", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const reactSources = import.meta.glob("../days/day-*/react.tsx", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function dayNumberFromPath(path: string) {
  const match = path.match(/day-(\d+)/);
  return match ? Number(match[1]) : 0;
}

function slugFromDay(day: number) {
  return `day-${String(day).padStart(2, "0")}`;
}

function toConsoleProblem(
  module: ConsoleModule,
  source: string,
  type: ConsoleProblem["type"],
): ConsoleProblem {
  return {
    ...module.meta,
    type,
    source,
    run: module.run,
  };
}

function toReactProblem(module: ReactModule, source: string): ReactProblem {
  return {
    ...module.meta,
    type: "react",
    source,
    Component: module.Solution,
  };
}

export const days: DayEntry[] = Object.keys(dsaModules)
  .map(dayNumberFromPath)
  .filter((day) => day > 0)
  .sort((left, right) => left - right)
  .map((day) => {
    const slug = slugFromDay(day);
    const dsaPath = `../days/${slug}/dsa.ts`;
    const jsPath = `../days/${slug}/js.ts`;
    const reactPath = `../days/${slug}/react.tsx`;
    const dsa = dsaModules[dsaPath];
    const js = jsModules[jsPath];
    const react = reactModules[reactPath];

    if (!dsa || !js || !react) {
      throw new Error(`${slug} must include dsa.ts, js.ts, and react.tsx.`);
    }

    return {
      day,
      slug,
      title: `Day ${day}`,
      summary: `${dsa.meta.title}, ${js.meta.title}, and ${react.meta.title}.`,
      problems: {
        dsa: toConsoleProblem(dsa, dsaSources[dsaPath], "dsa"),
        js: toConsoleProblem(js, jsSources[jsPath], "js"),
        react: toReactProblem(react, reactSources[reactPath]),
      },
    };
  });

export function getDay(dayId: string) {
  return days.find((day) => day.slug === dayId);
}

export function isProblemType(value: string): value is ProblemType {
  return value === "dsa" || value === "js" || value === "react";
}

export function getProblem(dayId: string, problemType: string) {
  const day = getDay(dayId);

  if (!day || !isProblemType(problemType)) {
    return null;
  }

  return day.problems[problemType];
}
