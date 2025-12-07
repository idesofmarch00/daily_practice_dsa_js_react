export const meta = {
  id: "day-59-dsa",
  title: "Bubble Sort Numbers",
  prompt: "Implement bubble sort for a number array.",
};

export function rangeSum(values: number[], start: number, end: number) {
  const prefix = [0];

  for (const value of values) {
    prefix.push(prefix[prefix.length - 1] + value);
  }

  return prefix[end + 1] - prefix[start];
}

export function run() {
  const values = [2, 4, 6, 8, 10];
  const start = 1;
  const end = 3;

  return [`Input: values = ${JSON.stringify(values)}, range = [${start}, ${end}]`, `Output: ${rangeSum(values, start, end)}`].join("\n");
}
