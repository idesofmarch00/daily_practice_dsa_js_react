export const meta = {
  id: "day-37-js",
  title: "Settings Entries to Object",
  prompt: "Convert settings entries into an object.",
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
