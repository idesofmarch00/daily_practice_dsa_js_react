export const meta = {
  id: "day-21-js",
  title: "Count Tags",
  prompt: "Count how many times each tag appears.",
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
