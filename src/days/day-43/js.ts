export const meta = {
  id: "day-43-js",
  title: "Safe Parse Cache Item",
  prompt: "Parse cached JSON without throwing.",
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
