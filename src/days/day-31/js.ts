export const meta = {
  id: "day-31-js",
  title: "Pick Public User Fields",
  prompt: "Build a new object from selected user keys.",
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
