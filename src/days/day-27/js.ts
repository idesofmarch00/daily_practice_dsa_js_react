export const meta = {
  id: "day-27-js",
  title: "Debounced Input Handler",
  prompt: "Wrap an input handler so the latest call wins.",
};

export function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function run() {
  const input = "{ bad json";
  const fallback = { ok: false };

  return [`Input: ${input}`, `Output: ${JSON.stringify(safeJsonParse(input, fallback))}`].join("\n");
}
