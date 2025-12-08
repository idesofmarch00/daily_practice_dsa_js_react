export const meta = {
  id: "day-60-dsa",
  title: "Sort Daily Counts",
  prompt: "Sort daily counts with nested loops.",
};

export function bubbleSort(values: number[]) {
  const sorted = [...values];

  for (let pass = 0; pass < sorted.length; pass += 1) {
    for (let index = 0; index < sorted.length - pass - 1; index += 1) {
      if (sorted[index] > sorted[index + 1]) {
        [sorted[index], sorted[index + 1]] = [sorted[index + 1], sorted[index]];
      }
    }
  }

  return sorted;
}

export function run() {
  const values = [5, 1, 4, 2, 8];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${JSON.stringify(bubbleSort(values))}`].join("\n");
}
