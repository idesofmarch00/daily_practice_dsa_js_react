export const meta = {
  id: "day-30-js",
  title: "Debounced Console Message",
  prompt: "Show how a debounce wrapper stores the latest call.",
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
