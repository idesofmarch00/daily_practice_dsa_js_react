export const meta = {
  id: "day-06-dsa",
  title: "Maximum Subarray",
  prompt: "Find the maximum sum of a contiguous subarray.",
};

export function maxSubarray(nums: number[]) {
  let best = nums[0];
  let current = nums[0];

  for (let index = 1; index < nums.length; index += 1) {
    current = Math.max(nums[index], current + nums[index]);
    best = Math.max(best, current);
  }

  return best;
}

export function run() {
  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

  return [`Input: ${JSON.stringify(nums)}`, `Output: ${maxSubarray(nums)}`].join("\n");
}
