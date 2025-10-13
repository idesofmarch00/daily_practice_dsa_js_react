export const meta = {
  id: "day-04-js",
  title: "Count Vowels",
  prompt: "Count vowels in a sentence using a clean JavaScript function.",
};

export function countVowels(value: string) {
  const matches = value.match(/[aeiou]/gi);
  return matches ? matches.length : 0;
}

export function run() {
  const input = "Practice makes progress";

  return [`Input: "${input}"`, `Output: ${countVowels(input)} vowels`].join("\n");
}
