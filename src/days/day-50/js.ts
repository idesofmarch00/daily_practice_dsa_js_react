export const meta = {
  id: "day-50-js",
  title: "Sort Cards by Priority",
  prompt: "Sort card objects by priority number.",
};

export function zip<T, U>(left: T[], right: U[]) {
  const length = Math.min(left.length, right.length);
  return Array.from({ length }, (_, index) => [left[index], right[index]]);
}

export function run() {
  const names = ["dsa", "js", "react"];
  const scores = [1, 2, 3];

  return [`Input: ${JSON.stringify(names)} and ${JSON.stringify(scores)}`, `Output: ${JSON.stringify(zip(names, scores))}`].join("\n");
}
