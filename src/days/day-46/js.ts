export const meta = {
  id: "day-46-js",
  title: "Sort Tasks by Points",
  prompt: "Sort objects by a numeric points property.",
};

export function pairsToObject(pairs: Array<[string, string | number]>) {
  return Object.fromEntries(pairs);
}

export function run() {
  const pairs: Array<[string, string | number]> = [["day", 12], ["topic", "arrays"]];

  return [`Input: ${JSON.stringify(pairs)}`, `Output: ${JSON.stringify(pairsToObject(pairs))}`].join("\n");
}
