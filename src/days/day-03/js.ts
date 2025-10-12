export const meta = {
  id: "day-03-js",
  title: "Flatten an Array",
  prompt: "Flatten a nested array of numbers without using Array.prototype.flat.",
};

type NestedNumber = number | NestedNumber[];

export function flattenArray(values: NestedNumber[]): number[] {
  const result: number[] = [];

  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flattenArray(value));
    } else {
      result.push(value);
    }
  }

  return result;
}

export function run() {
  const input = [1, [2, 3], [4, [5, 6]]];

  return [`Input: ${JSON.stringify(input)}`, `Output: ${JSON.stringify(flattenArray(input))}`].join(
    "\n",
  );
}
