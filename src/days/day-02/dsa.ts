export const meta = {
  id: "day-02-dsa",
  title: "Valid Parentheses",
  prompt: "Check whether a string containing brackets is balanced and correctly nested.",
};

const pairs: Record<string, string> = {
  ")": "(",
  "}": "{",
  "]": "[",
};

export function isValidParentheses(input: string) {
  const stack: string[] = [];

  for (const char of input) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else if (stack.pop() !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
}

export function run() {
  const input = "{[()]}";

  return [`Input: "${input}"`, `Output: ${isValidParentheses(input)}`].join("\n");
}
