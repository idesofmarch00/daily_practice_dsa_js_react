export const meta = {
  id: "day-45-dsa",
  title: "Shared Scores",
  prompt: "Return score values that appear in both lists.",
};

export function moveZeroes(values: number[]) {
  const nonZeroes = values.filter((value) => value !== 0);
  return [...nonZeroes, ...Array(values.length - nonZeroes.length).fill(0)];
}

export function run() {
  const values = [0, 1, 0, 3, 12];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${JSON.stringify(moveZeroes(values))}`].join("\n");
}
