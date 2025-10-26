export const meta = {
  id: "day-17-js",
  title: "Chunk Todo Items",
  prompt: "Split todo ids into fixed-size groups.",
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
