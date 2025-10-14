export const meta = {
  id: "day-05-dsa",
  title: "First Non-Repeating Character",
  prompt: "Find the first character in a string that appears only once.",
};

export function firstUniqueChar(value: string) {
  const counts = new Map<string, number>();

  for (const char of value) {
    counts.set(char, (counts.get(char) ?? 0) + 1);
  }

  for (const char of value) {
    if (counts.get(char) === 1) return char;
  }

  return null;
}

export function run() {
  const input = "swiss";

  return [`Input: "${input}"`, `Output: "${firstUniqueChar(input)}"`].join("\n");
}
