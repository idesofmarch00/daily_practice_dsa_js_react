export const meta = {
  id: "day-37-dsa",
  title: "Missing Attendance Id",
  prompt: "Return the absent id from a continuous range.",
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
