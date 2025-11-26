export const meta = {
  id: "day-48-js",
  title: "Sort Habits by Streak",
  prompt: "Sort habit objects by streak count.",
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
