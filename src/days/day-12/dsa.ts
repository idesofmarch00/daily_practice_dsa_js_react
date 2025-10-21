export const meta = {
  id: "day-12-dsa",
  title: "Search Student Score",
  prompt: "Find the index of a student score inside an unsorted list.",
};

export function findMinimum(values: number[]) {
  return values.reduce((minimum, value) => Math.min(minimum, value), values[0]);
}

export function run() {
  const values = [18, 4, 29, 11, 7];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${findMinimum(values)}`].join("\n");
}
