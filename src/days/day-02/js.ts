export const meta = {
  id: "day-02-js",
  title: "Palindrome Check",
  prompt: "Normalize a string and check whether it reads the same forward and backward.",
};

export function isPalindrome(value: string) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === normalized.split("").reverse().join("");
}

export function run() {
  const input = "A man, a plan, a canal: Panama";

  return [`Input: "${input}"`, `Output: ${isPalindrome(input)}`].join("\n");
}
