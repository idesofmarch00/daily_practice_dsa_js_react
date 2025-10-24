export const meta = {
  id: "day-15-js",
  title: "Capitalize Habit Name",
  prompt: "Turn a lowercase habit name into readable text.",
};

export function pick<T extends Record<string, unknown>>(source: T, keys: Array<keyof T>) {
  return Object.fromEntries(keys.map((key) => [key, source[key]]));
}

export function run() {
  const user = { name: "Sahil", streak: 60, private: false };

  return [`Input: ${JSON.stringify(user)}`, `Output: ${JSON.stringify(pick(user, ["name", "streak"]))}`].join("\n");
}
