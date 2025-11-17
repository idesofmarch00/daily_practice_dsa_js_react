export const meta = {
  id: "day-39-js",
  title: "Metrics Map to Object",
  prompt: "Convert metric pairs into an object.",
};

export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function run() {
  const value = 120;

  return [`Input: value = ${value}, range = 0..100`, `Output: ${clamp(value, 0, 100)}`].join("\n");
}
