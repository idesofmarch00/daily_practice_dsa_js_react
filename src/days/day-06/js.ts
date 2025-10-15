export const meta = {
  id: "day-06-js",
  title: "Remove Duplicates",
  prompt: "Return a new array with duplicate values removed.",
};

export function removeDuplicates<T>(values: T[]) {
  return [...new Set(values)];
}

export function run() {
  const input = [1, 2, 2, 3, 4, 4, 5];

  return [`Input: ${JSON.stringify(input)}`, `Output: ${JSON.stringify(removeDuplicates(input))}`].join(
    "\n",
  );
}
