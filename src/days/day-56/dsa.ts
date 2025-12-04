export const meta = {
  id: "day-56-dsa",
  title: "Sort Exam Scores",
  prompt: "Sort a small array using bubble sort.",
};

export function missingNumber(values: number[]) {
  const n = values.length;
  const expected = (n * (n + 1)) / 2;
  return expected - values.reduce((sum, value) => sum + value, 0);
}

export function run() {
  const values = [0, 1, 3, 4];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${missingNumber(values)}`].join("\n");
}
