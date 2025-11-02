export const meta = {
  id: "day-24-dsa",
  title: "Rotate Daily Goals",
  prompt: "Rotate goal order by a fixed number of steps.",
};

export function containsDuplicate(values: number[]) {
  return new Set(values).size !== values.length;
}

export function run() {
  const values = [3, 9, 4, 3, 8];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${containsDuplicate(values)}`].join("\n");
}
