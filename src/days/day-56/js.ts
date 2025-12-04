export const meta = {
  id: "day-56-js",
  title: "Zip Names and Scores",
  prompt: "Combine two arrays into name-score pairs.",
};

export function pairsToObject(pairs: Array<[string, string | number]>) {
  return Object.fromEntries(pairs);
}

export function run() {
  const pairs: Array<[string, string | number]> = [["day", 12], ["topic", "arrays"]];

  return [`Input: ${JSON.stringify(pairs)}`, `Output: ${JSON.stringify(pairsToObject(pairs))}`].join("\n");
}
