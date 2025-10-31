export const meta = {
  id: "day-22-dsa",
  title: "Rotate Playlist",
  prompt: "Move the last k playlist items to the front.",
};

export function findMinimum(values: number[]) {
  return values.reduce((minimum, value) => Math.min(minimum, value), values[0]);
}

export function run() {
  const values = [18, 4, 29, 11, 7];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${findMinimum(values)}`].join("\n");
}
