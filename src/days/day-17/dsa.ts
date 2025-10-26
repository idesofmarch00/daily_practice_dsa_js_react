export const meta = {
  id: "day-17-dsa",
  title: "Smallest Cart Price",
  prompt: "Return the lowest price from a price array.",
};

export function intersection(left: number[], right: number[]) {
  const rightSet = new Set(right);
  return [...new Set(left)].filter((value) => rightSet.has(value));
}

export function run() {
  const left = [1, 2, 2, 3, 4];
  const right = [2, 4, 6];

  return [`Input: ${JSON.stringify(left)} and ${JSON.stringify(right)}`, `Output: ${JSON.stringify(intersection(left, right))}`].join("\n");
}
