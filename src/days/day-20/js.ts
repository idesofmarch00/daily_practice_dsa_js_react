export const meta = {
  id: "day-20-js",
  title: "Chunk Practice Days",
  prompt: "Split practice day numbers into smaller groups.",
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
