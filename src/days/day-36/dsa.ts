export const meta = {
  id: "day-36-dsa",
  title: "Find Missing Roll Number",
  prompt: "Find the missing number from a 0 to n sequence.",
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
