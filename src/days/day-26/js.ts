export const meta = {
  id: "day-26-js",
  title: "Debounced Search Text",
  prompt: "Create a debounce wrapper and show the final delayed call.",
};

export function pairsToObject(pairs: Array<[string, string | number]>) {
  return Object.fromEntries(pairs);
}

export function run() {
  const pairs: Array<[string, string | number]> = [["day", 12], ["topic", "arrays"]];

  return [`Input: ${JSON.stringify(pairs)}`, `Output: ${JSON.stringify(pairsToObject(pairs))}`].join("\n");
}
