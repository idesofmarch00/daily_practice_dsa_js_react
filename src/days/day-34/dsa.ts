export const meta = {
  id: "day-34-dsa",
  title: "Push Missing Counts Back",
  prompt: "Move zero placeholders to the end of a list.",
};

export function containsDuplicate(values: number[]) {
  return new Set(values).size !== values.length;
}

export function run() {
  const values = [3, 9, 4, 3, 8];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${containsDuplicate(values)}`].join("\n");
}
