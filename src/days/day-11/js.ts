export const meta = {
  id: "day-11-js",
  title: "Title Case Sentence",
  prompt: "Capitalize the first letter of every word in a sentence.",
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
