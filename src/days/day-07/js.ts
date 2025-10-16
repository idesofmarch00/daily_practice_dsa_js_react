export const meta = {
  id: "day-07-js",
  title: "Deep Clone Object",
  prompt: "Clone a nested object without keeping references to nested values.",
};

export function deepClone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, deepClone(nested)]),
    ) as T;
  }

  return value;
}

export function run() {
  const input = { user: "Sahil", stats: { streak: 10 } };
  const clone = deepClone(input);
  clone.stats.streak = 11;

  return [
    `Original: ${JSON.stringify(input)}`,
    `Clone after edit: ${JSON.stringify(clone)}`,
  ].join("\n");
}
