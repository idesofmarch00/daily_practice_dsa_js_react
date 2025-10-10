export const meta = {
  id: "day-01-js",
  title: "Reverse a String",
  prompt: "Write a function that reverses a string without mutating the original value.",
};

export function reverseString(value: string) {
  return value.split("").reverse().join("");
}

export function run() {
  const input = "javascript";
  const output = reverseString(input);

  return [`Input: "${input}"`, `Output: "${output}"`].join("\n");
}
