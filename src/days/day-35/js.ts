export const meta = {
  id: "day-35-js",
  title: "Pick Visible Settings",
  prompt: "Build an object from visible settings only.",
};

export function pick<T extends Record<string, unknown>>(source: T, keys: Array<keyof T>) {
  return Object.fromEntries(keys.map((key) => [key, source[key]]));
}

export function run() {
  const user = { name: "Sahil", streak: 60, private: false };

  return [`Input: ${JSON.stringify(user)}`, `Output: ${JSON.stringify(pick(user, ["name", "streak"]))}`].join("\n");
}
