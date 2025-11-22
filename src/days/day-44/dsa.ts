export const meta = {
  id: "day-44-dsa",
  title: "Common Completed Days",
  prompt: "Find completed day numbers shared by two arrays.",
};

export function containsDuplicate(values: number[]) {
  return new Set(values).size !== values.length;
}

export function run() {
  const values = [3, 9, 4, 3, 8];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${containsDuplicate(values)}`].join("\n");
}
