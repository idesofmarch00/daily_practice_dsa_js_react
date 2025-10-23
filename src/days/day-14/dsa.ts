export const meta = {
  id: "day-14-dsa",
  title: "Find First Matching Number",
  prompt: "Scan an array and return the first index where the target appears.",
};

export function containsDuplicate(values: number[]) {
  return new Set(values).size !== values.length;
}

export function run() {
  const values = [3, 9, 4, 3, 8];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${containsDuplicate(values)}`].join("\n");
}
