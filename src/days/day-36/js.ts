export const meta = {
  id: "day-36-js",
  title: "Pairs to Object",
  prompt: "Convert key-value pairs into an object.",
};

export function pairsToObject(pairs: Array<[string, string | number]>) {
  return Object.fromEntries(pairs);
}

export function run() {
  const pairs: Array<[string, string | number]> = [["day", 12], ["topic", "arrays"]];

  return [`Input: ${JSON.stringify(pairs)}`, `Output: ${JSON.stringify(pairsToObject(pairs))}`].join("\n");
}
