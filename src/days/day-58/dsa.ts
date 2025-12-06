export const meta = {
  id: "day-58-dsa",
  title: "Sort Practice Times",
  prompt: "Sort a small list of practice times.",
};

export function secondLargest(values: number[]) {
  const sorted = [...new Set(values)].sort((left, right) => right - left);
  return sorted[1] ?? null;
}

export function run() {
  const values = [10, 4, 10, 8, 6];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${secondLargest(values)}`].join("\n");
}
