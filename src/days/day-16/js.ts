export const meta = {
  id: "day-16-js",
  title: "Chunk Scores",
  prompt: "Split an array of scores into chunks of a given size.",
};

export function pairsToObject(pairs: Array<[string, string | number]>) {
  return Object.fromEntries(pairs);
}

export function run() {
  const pairs: Array<[string, string | number]> = [["day", 12], ["topic", "arrays"]];

  return [`Input: ${JSON.stringify(pairs)}`, `Output: ${JSON.stringify(pairsToObject(pairs))}`].join("\n");
}
