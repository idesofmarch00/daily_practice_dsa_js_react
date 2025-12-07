export const meta = {
  id: "day-59-js",
  title: "Zip Keys and Counts",
  prompt: "Pair keys with count values.",
};

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function run() {
  const value = 120;

  return [`Input: value = ${value}, range = 0..100`, `Output: ${clamp(value, 0, 100)}`].join("\n");
}
