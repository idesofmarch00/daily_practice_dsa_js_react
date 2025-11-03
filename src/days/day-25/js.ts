export const meta = {
  id: "day-25-js",
  title: "Count Skill Labels",
  prompt: "Count repeated skill labels.",
};

export function pick<T extends Record<string, unknown>>(source: T, keys: Array<keyof T>) {
  return Object.fromEntries(keys.map((key) => [key, source[key]]));
}

export function run() {
  const user = { name: "Sahil", streak: 60, private: false };

  return [`Input: ${JSON.stringify(user)}`, `Output: ${JSON.stringify(pick(user, ["name", "streak"]))}`].join("\n");
}
