export const meta = {
  id: "day-38-js",
  title: "Query Pairs to Object",
  prompt: "Build an object from query-style pairs.",
};

type Task = {
  title: string;
  points: number;
};

export function sortByPoints(tasks: Task[]) {
  return [...tasks].sort((left, right) => left.points - right.points);
}

export function run() {
  const tasks = [
    { title: "DSA", points: 3 },
    { title: "React", points: 1 },
    { title: "JS", points: 2 },
  ];

  return [`Input: ${JSON.stringify(tasks)}`, `Output: ${JSON.stringify(sortByPoints(tasks))}`].join("\n");
}
