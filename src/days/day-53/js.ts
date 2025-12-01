export const meta = {
  id: "day-53-js",
  title: "Clamp Percentage",
  prompt: "Limit a percentage between 0 and 100.",
};

export function frequencyCounter(values: string[]) {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
}

export function run() {
  const values = ["js", "react", "js", "dsa"];

  return [`Input: ${JSON.stringify(values)}`, `Output: ${JSON.stringify(frequencyCounter(values))}`].join("\n");
}
