export const meta = {
  id: "day-51-js",
  title: "Clamp Progress Value",
  prompt: "Clamp a progress value between minimum and maximum.",
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
