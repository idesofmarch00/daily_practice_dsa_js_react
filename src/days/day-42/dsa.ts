export const meta = {
  id: "day-42-dsa",
  title: "Shared User Ids",
  prompt: "Find ids that appear in two user lists.",
};

export function findMinimum(values: number[]) {
  return values.reduce((minimum, value) => Math.min(minimum, value), values[0]);
}

export function run() {
  const values = [18, 4, 29, 11, 7];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${findMinimum(values)}`].join("\n");
}
