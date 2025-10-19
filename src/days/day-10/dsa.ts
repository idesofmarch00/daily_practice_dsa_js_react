export const meta = {
  id: "day-10-dsa",
  title: "Fibonacci with DP",
  prompt: "Return the nth Fibonacci number using dynamic programming.",
};

export function fibonacci(n: number) {
  if (n <= 1) return n;

  const dp = [0, 1];

  for (let i = 2; i <= n; i += 1) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

export function run() {
  const input = 10;

  return [`Input: n = ${input}`, `Output: ${fibonacci(input)}`].join("\n");
}
