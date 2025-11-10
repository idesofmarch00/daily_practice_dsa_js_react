export const meta = {
  id: "day-32-dsa",
  title: "Move Zero Scores",
  prompt: "Move zero scores after all non-zero scores.",
};

export function findMinimum(values: number[]) {
  return values.reduce((minimum, value) => Math.min(minimum, value), values[0]);
}

export function run() {
  const values = [18, 4, 29, 11, 7];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${findMinimum(values)}`].join("\n");
}
