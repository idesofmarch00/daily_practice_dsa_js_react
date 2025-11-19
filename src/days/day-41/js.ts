export const meta = {
  id: "day-41-js",
  title: "Safe Parse Settings",
  prompt: "Parse JSON safely and return a fallback on failure.",
};

export function capitalizeWords(sentence: string) {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function run() {
  const input = "daily coding habit";

  return [`Input: "${input}"`, `Output: "${capitalizeWords(input)}"`].join("\n");
}
